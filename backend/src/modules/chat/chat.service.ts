import { startOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, format } from 'date-fns';
import { GetModsStatsQueryParamsDto } from './../../../libs/dtos/src/auth/mod.stats.dto';
import { UserService } from './../user/user.service';
import { CloudinaryConfigService } from './../../config/cloudinary.config';
import { BadRequestException, Inject, Injectable, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, EntityManager, In, Repository } from 'typeorm';
import { AuthHelper } from '../auth/auth.helper';
import { User } from '../user/entities/user.entity';
import { Chat } from './entities/chat.entity';
import { Attachment } from './entities/attachment.entity';
import { IMessage } from '@lib/dtos';
import { ConfigEnum, IServerConfig, TransactionActionTypes, UserRoleEnum, UserStatusEnum } from '@lib/types';
import { FakeChat } from '../fake/entities/fakeChat.entity';
import { FakeService } from '../fake/fake.service';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { FallOutUsers } from '../user/entities/user.fallout.entity';
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(FakeChat)
    private readonly fakeChatRepo: Repository<FakeChat>,
    @InjectRepository(FallOutUsers)
    private readonly fallOutUsersRepo: Repository<FallOutUsers>,
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,

    @Inject(MailService)
    private readonly mailService: MailService,

    @Inject(ConfigService)
    private readonly configService: ConfigService,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
    private readonly cloudinary: CloudinaryConfigService
  ) {}
  private notificationCount = {};

  public async createChat(data: IMessage, token?: string, senderUser?: User) {
    const sender = await this.findUserById(data.sender);
    let transaction;
    if (sender?.role === UserRoleEnum.CUSTOMER && typeof data?.attachments !== 'string') {
      transaction = await this.userService.makeTransaction(token, TransactionActionTypes.SENDMESSAGE);
    }
    if (transaction || senderUser.role === UserRoleEnum.FAKE || typeof data?.attachments === 'string') {
      if (senderUser.role === UserRoleEnum.FAKE) {
        const fallOut = await this.checkFallOutUser(data?.receiver, data?.sender);
        if (!fallOut) {
          const firstTwoMessages = await this.chatRepository.find({
            where: { sender: data?.sender, receiver: data?.receiver },
            order: { createdAt: 'ASC' },
            take: 2,
          });
          const customerUserHasReplied = await this.hasCustomerUserReplied(
            firstTwoMessages,
            data?.receiver,
            data?.sender
          );
          if (!customerUserHasReplied && firstTwoMessages?.length >= 2) {
            await this.addToFalloutTable(data?.sender, data?.receiver);
            // throw new HttpException('The target user has not replied to the first two messages', HttpStatus.BAD_REQUEST);
          }
        } else {
          // throw new HttpException('The target user has been fall out', HttpStatus.BAD_REQUEST);
        }
      }
      const obj = {
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        seen: data.seen,
      };
      const savedChat = await this.chatRepository.save(obj);
      if (savedChat) {
        if (data?.attachments) {
          let attachmentEntity;
          if (typeof data?.attachments === 'string') {
            attachmentEntity = new Attachment();
            attachmentEntity.fileUrl = data?.attachments;
          } else {
            const res: any = await this.cloudinary.uploadFile(data.attachments['0'], 'chat');
            attachmentEntity = new Attachment();
            attachmentEntity.fileUrl = res?.url;
            attachmentEntity.fileName = data.attachments?.originalname;
            attachmentEntity.fileType = data.attachments?.mimetype;
          }
          attachmentEntity.chat = savedChat;
          await this.attachmentRepository.save(attachmentEntity);
          const attachment = await this.chatRepository.findOne({
            where: {
              id: savedChat.id,
            },
            relations: ['attachments'],
          });
          return attachment;
        }
        return savedChat;
      } else {
        throw new HttpException('Something went wrong', HttpStatus.BAD_GATEWAY);
      }
    } else {
      throw new HttpException('Payment Failed', HttpStatus.BAD_GATEWAY);
    }
  }

  public async hasCustomerUserReplied(firstTwoMessages: IMessage[], customerUserId: string, fakeUserId: string) {
    const customerUserMessages = await this.chatRepository.count({
      where: { sender: customerUserId, receiver: fakeUserId },
    });
    return customerUserMessages >= firstTwoMessages.length;
  }

  public async checkFallOutUser(customerId: string, fakeId: string) {
    return await this.fallOutUsersRepo.findOne({
      where: {
        fake: { id: fakeId },
        user: { id: customerId },
      },
      relations: ['fake'],
    });
  }

  public async findUserById(id: string) {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  public async getMessages(
    senderId: string,
    receiverId: string,
    token?: string
  ): Promise<{ chats: Chat[]; moderatorIds: number[] }> {
    if (token) {
      const tokenValue = token.split(' ')[1];
      const decoded = await this.helper.decode(tokenValue as string);
      const user = await this.helper.validateUser(decoded);
      if (!user) throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    }

    const sender = await this.userRepository.findOneBy({ id: senderId });
    const receiver = await this.userRepository.findOneBy({ id: receiverId });
    if (!sender || !receiver) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const query = this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.attachments', 'attachment')
      .leftJoinAndSelect('chat.chat', 'fakeChat')
      .where(
        new Brackets((qb) => {
          qb.where(
            '(chat.sender = :senderId AND chat.receiver = :receiverId) OR (chat.sender = :receiverId AND chat.receiver = :senderId)',
            { senderId, receiverId }
          );
        })
      )
      .andWhere(
        'chat.id IN (SELECT c2.id FROM chat c2 WHERE c2.sender = :senderId OR c2.receiver = :senderId ORDER BY c2.createdAt DESC)',
        { senderId }
      )
      .select('chat')
      .addSelect('attachment')
      .addSelect('fakeChat.moderatorId');

    const chats = await query.getMany();
    const moderatorIdsSet = new Set(chats.map((chat: any) => chat?.chat?.moderatorId).filter(Boolean));
    const moderatorIds = Array.from(moderatorIdsSet);
    return { chats, moderatorIds };
  }

  public async getModsIds(sender: string, receiver: string) {
    const { moderatorIds } = await this.getMessages(sender, receiver);
    return moderatorIds;
  }
  public async getChatUsers(token: string, userId: string) {
    const tokenValue = token.split(' ')[1];
    const decoded = await this.helper.decode(tokenValue as string);
    const verified = await this.helper.validateUser(decoded);
    if (!verified) throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    const user = await this.findUserById(userId);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const users: any = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id IN (SELECT chat.sender FROM chat WHERE chat.receiver = :userId)', { userId })
      .orWhere('user.id IN (SELECT chat.receiver FROM chat WHERE chat.sender = :userId)', { userId })
      .andWhere('user.id != :userId', { userId })
      // .leftJoin('chat', 'c', 'user.id = c.sender OR user.id = c.receiver')
      // .innerJoin(
      //   'chat',
      //   'c',
      //   '(user.id = c.sender AND c.receiver = :userId) OR (user.id = c.receiver AND c.sender = :userId)',
      //   { userId }
      // )
      // .where('c.sender = :userId OR c.receiver = :userId', { userId })
      // .andWhere('user.id != :userId')
      .distinct(true)
      .getMany();
    const unseenMessageCounts = await this.getUnseenMessagesCount(userId);
    const usersWithNotificationCount = users.map((user) => {
      const userWithNotificationCount = { ...user, notificationCount: 0 };
      const notificationEntry = unseenMessageCounts.find((entry) => entry.userId === user.id);
      if (notificationEntry) {
        userWithNotificationCount.notificationCount = notificationEntry.count;
      }
      return userWithNotificationCount;
    });
    return usersWithNotificationCount;
  }

  async isFakeMessage(senderId: string): Promise<boolean> {
    const sender: User = await this.findUserById(senderId);
    return sender.role === UserRoleEnum.FAKE;
  }

  async createFakeChat(data: IMessage, accessToken?: string) {
    if (accessToken) {
      const tokenValue = accessToken.split(' ')[1];
      const decoded = await this.helper.decode(tokenValue as string); // verify access token and get user from db
      const user: User = decoded ? await this.helper.validateUser(decoded) : null;
      if (!user) {
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      }
      if (
        user.role === UserRoleEnum.MODERATOR &&
        (user.status === UserStatusEnum.BLOCK ||
          user.status === UserStatusEnum.INACTIVE ||
          user.status === UserStatusEnum.UNVERIFIED)
      ) {
        throw new HttpException('User not allowed!', HttpStatus.NOT_FOUND);
      }
      if (user.role !== UserRoleEnum.MODERATOR) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

      const savedChat = await this.createChat(data);
      if (!savedChat) throw new HttpException('Chat not saved!', HttpStatus.BAD_GATEWAY);
      return await this.createModeratorFakeUserReference(user?.id, savedChat);
    } else {
      const savedChat = await this.createChat(data);
      if (!savedChat) throw new HttpException('Chat not saved!', HttpStatus.BAD_GATEWAY);
      return savedChat;
    }
  }

  public async createModeratorFakeUserReference(moderatorId: string, table: Chat) {
    const user = await this.findUserById(moderatorId);
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    if (
      user.role === UserRoleEnum.MODERATOR &&
      (user.status === UserStatusEnum.BLOCK ||
        user.status === UserStatusEnum.INACTIVE ||
        user.status === UserStatusEnum.UNVERIFIED)
    ) {
      throw new HttpException('User not allowed!', HttpStatus.NOT_FOUND);
    }
    if (user.role !== UserRoleEnum.MODERATOR) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const modTrack = new FakeChat();
    modTrack.moderatorId = moderatorId;
    modTrack.chat = table;
    modTrack.type = user.role;
    return await this.fakeChatRepo.save(modTrack);
  }

  async detectFakeAndSendMail(sender, receiverId, message) {
    const user = await this.findUserById(sender);
    message = typeof message === 'string' ? message?.substring(0, 10) + '*****' : null;
    const receiver = await this.findUserById(receiverId);
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    const yes = await this.isFakeMessage(sender);
    const subject = 'You received a message from *****';
    if (yes) {
      const online = await this.userService.checkOnlineStatus(sender);
      if (online === false) {
        await this.userService.updateOnlineStatus(sender, true);
      }
      const { frontendUrl } = this.configService.get<IServerConfig>(ConfigEnum.SERVER);
      this.mailService.sendFakeMessageMail(
        subject,
        {
          firstName: user?.userName,
          message: message,
          email: user?.email,
          authLoginLink: frontendUrl,
        },
        receiver?.email
      );
    }
  }

  public async updateMessageSeen(receiver: string, sender: string) {
    await this.chatRepository.update({ receiver, seen: false, sender }, { seen: true });
    return await this.getUnseenMessagesCount(receiver);
  }

  public async getUnseenMessagesCount(receiverId: string) {
    const unseenChats: Chat[] = await this.chatRepository.findBy({
      receiver: receiverId,
      seen: false,
    });
    const newNotifications = {};
    unseenChats.forEach((chat) => {
      const senderId = chat.sender;
      if (!this.notificationCount[senderId]) {
        this.notificationCount[senderId] = 0;
      }

      if (!newNotifications[senderId]) {
        newNotifications[senderId] = 0;
      }

      if (!chat.seen) {
        newNotifications[senderId]++;
      }
    });
    const notification = {};

    Object.entries(newNotifications).forEach(([userId, count]) => {
      notification[userId] = count;
    });
    const notificationCounts = Object.entries(notification).map(([userId, count]) => ({ userId, count }));
    return notificationCounts;
  }

  public async addToFalloutTable(fakeUserId: string, customerUserId: string) {
    const fakeUser: User = await this.findUserById(fakeUserId);
    const customerUser: User = await this.findUserById(customerUserId);
    if (!fakeUser) throw new HttpException('Fake not allowed!', HttpStatus.NOT_FOUND);
    if (!customerUser) throw new HttpException('User not allowed!', HttpStatus.NOT_FOUND);
    const fallOutUser = new FallOutUsers();
    fallOutUser.fake = fakeUser;
    fallOutUser.user = customerUser;
    await this.fallOutUsersRepo.save(fallOutUser);
  }

  public async statsModGotRepliesFromUser(params: GetModsStatsQueryParamsDto) {
    try {
      const { modId, startDate, endDate, duration } = params;

      let query = this.fakeChatRepo
        .createQueryBuilder('fakeChat')
        .leftJoinAndSelect('fakeChat.chat', 'chat')
        .where('fakeChat.moderatorId = :modId', { modId });

      if (startDate && endDate) {
        query = query.andWhere('chat.createdAt BETWEEN :startDate AND :endDate', {
          startDate: startOfDay(parseISO(startDate)),
          endDate: startOfDay(parseISO(endDate)),
        });
      }

      query = query
        .andWhere('chat.sender IN (SELECT id FROM user WHERE role = :customerRole)')
        .andWhere('chat.receiver IN (SELECT id FROM user WHERE role = :fakeRole)')
        .setParameter('customerRole', UserRoleEnum.CUSTOMER)
        .setParameter('fakeRole', UserRoleEnum.FAKE);
      let groupColumn;
      if (duration === 'monthly') {
        groupColumn = 'DATE_FORMAT(chat.createdAt, "%Y-%m")';
      } else if (duration === 'weekly') {
        groupColumn = 'DATE_FORMAT(chat.createdAt, "%x-%v")';
      } else {
        groupColumn = 'DATE(chat.createdAt)';
      }

      query = query
        .select(['COUNT(Distinct chat.sender) as Users', 'COUNT(Distinct chat.id) as MessageReplies', groupColumn])
        .groupBy(groupColumn);
      const result = await query.getRawMany();

      const groupedData = [
        {
          Month: format(new Date(), 'MMMM'),
          MessageReplies: result[0]?.Users,
          modId,
        },
      ];
      // for (const row of result) {
      //   const month = format(new Date(row['DATE_FORMAT(`chat`.`createdAt`, "%Y-%m")']), 'MMMM');
      //   groupedData.push({
      //     Month: month,
      //     MessageReplies: parseInt(row.Users),
      //     modId,
      //   });
      // }
      return groupedData;
    } catch (error) {
      throw new HttpException('Could not get replies from user', HttpStatus.NOT_FOUND);
    }
  }

  public async statsModGotSentToUser(params: GetModsStatsQueryParamsDto) {
    try {
      const { modId, startDate, endDate, duration } = params;

      let query = this.fakeChatRepo
        .createQueryBuilder('fakeChat')
        .leftJoinAndSelect('fakeChat.chat', 'chat')
        .where('fakeChat.moderatorId = :modId', { modId });

      if (startDate && endDate) {
        query = query.andWhere('chat.createdAt BETWEEN :startDate AND :endDate', {
          startDate: startOfDay(parseISO(startDate)),
          endDate: startOfDay(parseISO(endDate)),
        });
      }

      query = query
        .andWhere('chat.sender IN (SELECT id FROM user WHERE role = :fakeRole)')
        .andWhere('chat.receiver IN (SELECT id FROM user WHERE role = :customerRole)')
        .setParameter('fakeRole', UserRoleEnum.FAKE)
        .setParameter('customerRole', UserRoleEnum.CUSTOMER);

      let groupColumn;
      if (duration === 'monthly') {
        groupColumn = 'DATE_FORMAT(chat.createdAt, "%Y-%m")';
      } else if (duration === 'weekly') {
        groupColumn = 'DATE_FORMAT(chat.createdAt, "%x-%v")';
      } else {
        groupColumn = 'DATE(chat.createdAt)';
      }

      query = query.select(['COUNT(chat.id) as SendMessages', groupColumn]).groupBy(groupColumn);
      const result = await query.getRawMany();

      const groupedData = [
        {
          Month: format(new Date(), 'MMMM'),
          SendMessages: result[0]?.SendMessages,
          modId,
        },
      ];
      // for (const row of result) {
      //   const month = format(new Date(row['DATE_FORMAT(`chat`.`createdAt`, "%Y-%m")']), 'MMMM');
      //   groupedData.push({
      //     Month: month,
      //     SendMessages: parseInt(row.SendMessages),
      //     modId,
      //   });
      // }
      return groupedData;
    } catch (error) {
      throw new HttpException('Could not get sent messages to user', HttpStatus.NOT_FOUND);
    }
  }

  public async getNewRandomModeratorDB() {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', {
        role: UserRoleEnum.MODERATOR,
      })
      .andWhere('user.status = :status', { status: In([UserStatusEnum.ACTIVE, UserStatusEnum.VERIFIED]) })
      .orderBy('RAND()')
      .limit(1)
      .getOne();
  }

  public async getLatestMessage(senderId: string, receiverId: string): Promise<Chat> {
    const chat: any = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.attachments', 'attachment')
      .leftJoinAndSelect('chat.chat', 'fakeChat')
      .where(
        new Brackets((qb) => {
          qb.where(
            '(chat.sender = :senderId AND chat.receiver = :receiverId) OR (chat.sender = :receiverId AND chat.receiver = :senderId)',
            { senderId, receiverId }
          );
        })
      )
      .andWhere(
        'chat.id IN (SELECT c2.id FROM chat c2 WHERE c2.sender = :senderId OR c2.receiver = :senderId ORDER BY c2.createdAt DESC)',
        { senderId }
      )
      .andWhere('fakeChat.type = :type', { type: UserRoleEnum.MODERATOR })
      .select('chat')
      .addSelect('attachment')
      .addSelect('fakeChat.moderatorId')
      .orderBy('chat.createdAt', 'DESC')
      .limit(1)
      .getOne();
    return chat;
  }

  public async getModChatUsers(token?: string, userId?: string) {
    const tokenValue = token.split(' ')[1];
    const decoded = await this.helper.decode(tokenValue as string);
    const verified = await this.helper.validateUser(decoded);
    if (!verified) throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    const id = verified.role === UserRoleEnum.MODERATOR ? verified?.id : userId;
    const fakeChats: any = await this.fakeChatRepo
      .createQueryBuilder('fakeChat')
      .leftJoinAndSelect('fakeChat.chat', 'chat')
      .select('fakeChat')
      .where('fakeChat.moderatorId = :modId', { modId: id })
      .andWhere('fakeChat.type = :type', { type: UserRoleEnum.MODERATOR })
      .addSelect('chat')
      .getMany();
    const chatMap = new Map();
    await Promise.all(
      fakeChats.map(async (fakeChat) => {
        const sender = await this.findUserById(fakeChat?.chat?.sender);
        const receiver = await this.findUserById(fakeChat?.chat?.receiver);
        const unseenCount = await this.chatRepository
          .createQueryBuilder('chat')
          .where(
            new Brackets((qb) => {
              qb.where(
                '(chat.sender = :senderId AND chat.receiver = :receiverId) OR (chat.sender = :receiverId AND chat.receiver = :senderId)',
                { senderId: sender.id, receiverId: receiver.id }
              );
            })
          )
          .andWhere('chat.seen = :seen', { seen: false })
          .getCount();
        const key = `${Math.min(parseInt(sender.id), parseInt(receiver.id))}-${Math.max(
          parseInt(sender.id),
          parseInt(receiver.id)
        )}`;
        chatMap.set(key, {
          sender: {
            id: sender.id,
            name: sender?.userName,
            avatar: sender?.profile?.avatarUrl,
          },
          receiver: {
            id: receiver.id,
            name: receiver?.userName,
            avatar: receiver?.profile?.avatarUrl,
          },
          unseenCount,
        });
      })
    );
    const fakeChatPartners = Array.from(chatMap.values());
    return { fakeChatPartners };
  }
}
