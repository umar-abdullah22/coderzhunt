"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeService = void 0;
const fakeUser_entity_1 = require("./../user/entities/fakeUser.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_helper_1 = require("../auth/auth.helper");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const src_1 = require("../../../libs/types/src");
const customer_profiledata_entity_1 = require("../user/entities/customer.profiledata.entity");
const user_service_1 = require("../user/user.service");
const cloudinary_config_1 = require("../../config/cloudinary.config");
let FakeService = class FakeService {
    constructor(userRepository, profile, fakeCreator, helper, userService, cloudinary) {
        this.userRepository = userRepository;
        this.profile = profile;
        this.fakeCreator = fakeCreator;
        this.helper = helper;
        this.userService = userService;
        this.cloudinary = cloudinary;
    }
    async createFake(accessToken, body, file) {
        const accessTokenValue = accessToken.split(' ')[1];
        const decodedToken = await this.helper.decode(accessTokenValue);
        const user = decodedToken ? await this.helper.validateUser(decodedToken) : null;
        let result;
        let url;
        if (!user) {
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.NOT_FOUND);
        }
        if (file) {
            result = await this.cloudinary.uploadImage(file, 'fake').catch(() => {
                throw new common_1.HttpException('Invalid file type.', common_1.HttpStatus.BAD_REQUEST);
            });
            url = result.url;
        }
        const fakeUser = new user_entity_1.User({
            role: src_1.UserRoleEnum.FAKE,
            status: src_1.UserStatusEnum.VERIFIED,
            selfGender: body.selfGender,
            interestedGender: body.interestedGender,
            userName: body.userName,
            email: body.email,
        });
        if (fakeUser) {
            const profile = new customer_profiledata_entity_1.CustomerProfileData();
            profile.children = body.children;
            profile.isEmailVerified = src_1.UserStatusEnum.VERIFIED;
            profile.life = body.life;
            profile.relationshipStatus = body.relationshipStatus;
            profile.smoker = body.smoker;
            if (body.dob) {
                profile.dateOfBirth = await this.validateDateOfBirth(body.dob);
            }
            if (url) {
                profile.setAvatarUrl(url);
            }
            if (profile) {
                fakeUser.profile = profile;
                await this.profile.save(profile);
            }
            const savedUser = await this.userRepository.save(fakeUser);
            if (savedUser) {
                const creator = new fakeUser_entity_1.FakeCreator();
                creator.user = savedUser;
                creator.createdBy = user === null || user === void 0 ? void 0 : user.id;
                await this.fakeCreator.save(creator);
                savedUser.address = await this.userService.validateAndSaveAddress(body.postalCode, savedUser);
            }
        }
    }
    async findAll() {
        const result = await this.userRepository.find({ where: { role: src_1.UserRoleEnum.FAKE } });
        return result;
    }
    async findOne(id) {
        const fake = await this.userRepository.findOneBy({ id, role: src_1.UserRoleEnum.FAKE });
        if (fake == null) {
            throw new common_1.HttpException('Fake Account not found!', common_1.HttpStatus.NOT_FOUND);
        }
        return fake;
    }
    async updateById(id, body) {
        const fake = await this.userRepository.findOneBy({ id, role: src_1.UserRoleEnum.FAKE });
        if (fake == null) {
            throw new common_1.HttpException('Fake Account not found!', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            if (body.name)
                fake.setUserName(body.name);
            if (body.email)
                fake.setEmail(body.email);
            if (body.gender)
                fake.setSelfGender(body.gender);
            if (body.dob)
                fake.profile.setDateOfBirth(body.dob);
            if (body.smoker)
                fake.profile.setSmoker(body.smoker);
            if (body.relation)
                fake.profile.setRelationShipStatus(body.relation);
            if (body.postalCode)
                fake.address.setAddress(body.postalCode);
            if (body.life)
                fake.profile.setLife(body.life);
            if (body.children)
                fake.profile.setChildren(body.children);
            return await this.userRepository.save(fake);
        }
    }
    async deleteById(id) {
        const fake = await this.userRepository.findOneBy({ id, role: src_1.UserRoleEnum.FAKE });
        if (fake == null) {
            throw new common_1.HttpException('Fake Account not found!', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.userRepository.remove(fake);
    }
    async getRandomFake() {
        const randomUser = await this.userRepository
            .createQueryBuilder('user')
            .select()
            .orderBy('RAND()')
            .where('user.role =:role', { role: src_1.UserRoleEnum.FAKE })
            .limit(1)
            .getOne();
        return randomUser;
    }
    generateRandomMessage() {
        const messages = ['Hey, wanna catch up?', 'Hi there! How are you doing?', 'Hello! Are you new here?'];
        const index = Math.floor(Math.random() * (messages === null || messages === void 0 ? void 0 : messages.length));
        return messages[index];
    }
    generateRandomTimeInterval() {
        const min = 1;
        const max = 5;
        return Math.floor(Math.random() * (max - min + 1) + min) * 60 * 1000;
    }
    async validateDateOfBirth(dob) {
        const [year, month, day] = dob.split('-');
        const parsedDateOfBirth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const now = new Date();
        const ageInMs = now.getTime() - parsedDateOfBirth.getTime();
        const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
        if (ageInYears >= 18 && ageInYears <= 65) {
            return parsedDateOfBirth;
        }
        else {
            throw new common_1.HttpException('Invalid date of birth', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
FakeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_profiledata_entity_1.CustomerProfileData)),
    __param(2, (0, typeorm_1.InjectRepository)(fakeUser_entity_1.FakeCreator)),
    __param(3, (0, common_1.Inject)(auth_helper_1.AuthHelper)),
    __param(4, (0, common_1.Inject)(user_service_1.UserService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        auth_helper_1.AuthHelper,
        user_service_1.UserService,
        cloudinary_config_1.CloudinaryConfigService])
], FakeService);
exports.FakeService = FakeService;
//# sourceMappingURL=fake.service.js.map