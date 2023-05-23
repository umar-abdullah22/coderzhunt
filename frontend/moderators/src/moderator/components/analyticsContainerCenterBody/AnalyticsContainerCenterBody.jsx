import React, { useEffect, useRef, useState } from 'react';
import styled from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faPaperclip,
  faPaperPlane,
  faPlusSquare,
  faSmile,
  faTrash,
} from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChat } from '../../../store/slices/moderatorApi/actions';
import {
  setFakeCustomerId,
  setRealCustomerId,
} from '../../../store/slices/moderatorApi/moderatorApiSlice';
import { useConnection } from '../../../socket/SocketConnection';
import { unwrapResult } from '@reduxjs/toolkit';
import ClosePng from '../../../assets/images/close.png';
import ImageUploadChat from '../../../assets/images/imageUploadChat.svg';
import { useUser } from '../../../providers/useUser';


const AnalyticsContainerCenterBody = () => {
  const { loggedInUser } = useUser()
  const chatHistoryRef = useRef(null);
  const { realCustomerId, fakeUserId, userList } = useSelector((state) => state.moderatorApi)
  const [message, setMessage] = useState()
  const [msgImage, setMsgImage] = useState(``)
  const [mediaAttachment, setMediaAttachment] = useState(``)

  const { sendMessage, messages, setMessages, acknowledgeUnseenMessageCount } = useConnection()
  const dispatch = useDispatch()

  useEffect(() => {
    if (fakeUserId?.length && realCustomerId?.length) {
      dispatch(fetchChat({
        senderId: fakeUserId,
        receiverId: realCustomerId
      })).then(unwrapResult).then((result) => {
        setMessages(result.chats)
      })

      acknowledgeUnseenMessageCount(fakeUserId, realCustomerId)
    }
  }, [realCustomerId, fakeUserId])


  const onChatMessageHandler = (e) => {
    e.preventDefault();
    if (fakeUserId?.length && realCustomerId?.length) {
      const payload = {
        sender: fakeUserId,
        receiver: realCustomerId,
        moderator: loggedInUser.id,
        message: message,
        seen: false,
      };

      if (mediaAttachment) {
        payload.attachments = mediaAttachment
      }

      sendMessage(payload);
      setMessage(``)
      setMediaAttachment(``)
      setMsgImage(``)
    }
  }
  function findUserName(id) {
    const userName = userList.find((client) => client.id == id && client.userName)

    return userName.userName
  }

  return (
    <div className={styled.analyticsContainerCenterBody}>
      <div className={`${styled.pageContent} ${styled.pageContainer}`} id={styled.pageContent}>
        <div className='padding'>
          <div
            className={`${styled.row} ${styled.container} ${styled.dFlex} ${styled.justifyContentCenter}`}
          >
            <div className={styled.colMd6}>
              <div className={`${styled.card} ${styled.cardBordered}`}>
                <div className={styled.cardHeader}></div>

                <div
                  className={`${styled.psContainer} ${styled.psThemeDefault} ${styled.psActiveY}`}
                  id={styled.chatContent}
                  style={{ overflowY: 'scroll', height: '500px' }}
                >
                  <div className={styled.farvChatDetailsBody}>
                    <div className={styled.chat_history} >
                      <ul>
                        {messages?.map((message, index) => (
                          <li className={realCustomerId === message.receiver ? styled.clear : ''} key={"msg" + index}>
                            {realCustomerId === message.sender ? (
                              <>
                                <div className={styled.message_data} style={{ textAlign: 'left' }}>
                                  &nbsp; &nbsp;
                                  <i className={styled.circle_online}></i>
                                  <span className={styled.message_data_name}>{findUserName(realCustomerId)}</span>
                                  <span className={styled.message_data_time}>
                                    {new Date(message.createdAt).toLocaleString()}
                                  </span>
                                </div>
                                <div
                                  className={`${styled.message} ${realCustomerId === message.sender ? styled.my_message : styled.other_message
                                    }`}
                                >
                                  {message?.attachments?.length > 0 ?
                                    <div className={styled.chatMsgImg}>
                                      <img src={message.attachments[0]?.fileUrl} alt='img' />
                                    </div>
                                    : message.message
                                  }
                                </div>
                              </>

                            ) : fakeUserId === message.sender && (
                              <>
                                <div className={styled.message_data} style={{ textAlign: 'right' }}>
                                  <span className={styled.message_data_time}>
                                    {new Date(message.createdAt).toLocaleString()}
                                  </span>
                                  <i className={styled.circle_online}></i>
                                  <span className={styled.message_data_name}>{findUserName(fakeUserId)}</span>
                                  &nbsp; &nbsp;
                                </div>
                                <div
                                  className={`${styled.message} ${realCustomerId === message.sender ? styled.my_message : styled.other_message
                                    }`}
                                >
                                  {message?.attachments?.length > 0 ?
                                    <div className={styled.chatMsgImg}>
                                      <img src={message.attachments[0]?.fileUrl} alt='img' />
                                    </div>
                                    : message.message
                                  }
                                </div>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                      <div ref={chatHistoryRef} />
                    </div>
                  </div>

                  <div className={styled.psScrollbarXRail} style={{ left: '0px', bottom: '0px' }}>
                    <div
                      className={styled.psScrollbarX}
                      tabIndex='0'
                      style={{ left: '0px', width: '0px' }}
                    ></div>
                  </div>
                  <div
                    className={styled.psScrollbarYRail}
                    style={{ top: '0px', height: '0px', right: '2px' }}
                  >
                    <div
                      className={styled.psScrollbarY}
                      tabIndex='0'
                      style={{ top: '0px', height: '2px' }}
                    ></div>
                  </div>
                </div>
                <form className={`${styled.publisher} ${styled.bt1} ${styled.borderLight}`} onSubmit={onChatMessageHandler}>
                  <img
                    className='avatar avatar-xs'
                    src='https://img.icons8.com/color/36/000000/administrator-male.png'
                    alt='...'
                  />
                  <textarea
                    className={styled.publisherInput}
                    placeholder='Write something'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <span>
                    {msgImage ? <img src={ClosePng} alt=''

                      onClick={() => {
                        setMsgImage(``)
                        setMediaAttachment(``)
                      }}
                    /> :
                      <>
                        <input
                          type='file'
                          name='photoMessage'
                          className={styled.fileUploadInput}
                          accept='image/*'
                          onChange={(e) => {
                            setMsgImage(URL.createObjectURL(e.target.files[0]))
                            setMediaAttachment(e.target.files)
                          }}
                        />
                        <img src={ImageUploadChat} alt='' />
                      </>
                    }
                    {msgImage && (
                      <div className={styled.giftsIcons}>
                        <img src={msgImage} alt='' />
                      </div>
                    )}
                  </span>
                  {/* 
                  <Link className={styled.publisherBtn} to='' data-abc='true'>
                    <FontAwesomeIcon icon={faSmile} />
                  </Link> */}
                  <button
                    className={`${styled.publisherBtn} ${styled.textInfo}`}
                    to=''
                    data-abc='true'
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnalyticsContainerCenterBody;
