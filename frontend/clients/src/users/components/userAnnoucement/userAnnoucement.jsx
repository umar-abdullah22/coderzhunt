/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import styled from './style.module.css';
import GiftIcon from '../../../assets/images/gift_icon.svg';
import DeleteChat from '../../../assets/images/deleteChat_icon.svg';
import ImageUploadChat from '../../../assets/images/imageUploadChat.svg';
import ClosePng from '../../../assets/images/close.png';
import ImageSmileChat from '../../../assets/images/imageSmileChat.svg';
import { useConnection } from '../../../socket/SocketConnection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { gifTransactionAction, userGiftListAction } from '../../../store/slices/customerAPI/action';
import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import { fetchEmojis } from '../../../store/slices/userAuth/actions';
import { useUser } from '../../../providers/useUser';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'hidden',
  overflowY: 'scroll',
  p: 4,
};

const UserAnnoucement = (props) => {
  const chatHistoryRef = useRef(null);
  const [showSmile, setShowSmile] = useState(false)
  const [emojis, setEmojis] = useState(``);
  const [isLoading, setIsLoading] = useState(false)

  const [msgImage, setMsgImage] = useState(``)
  const [mediaAttachment, setMediaAttachment] = useState(``)
  const [openGiftModal, setOpenGiftModal] = useState(false)
  const [gifts, setGifts] = useState();

  const announcementId = useMemo(() => {
    const url = window.location.href;
    const regex = /\/userAnnoucements\/\?(.*)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }, [window.location.href]);


  const {
    sendMessage,
    messages,
    currentSelectedUser,
    moderatorIds
  } = useConnection();

  const dispatch = useDispatch();
  const { user } = useUser()
  const [message, setMessage] = useState('');

  const handleGiftModal = () => {
    setOpenGiftModal(true)

    dispatch(userGiftListAction())
      .then(unwrapResult)
      .then((result) => {
        setGifts(result);
      })
      .catch((error) => {
      });
  };

  const handleGiftTransaction = (e, gift) => {
    e.preventDefault()
    const payload = {
      actionType: "SendGift",
      receiverId: announcementId,
      subAction: gift.actionType
    }
    dispatch(gifTransactionAction(payload)).then(unwrapResult)
      .then((result) => {
        if (result.data.success) {
          onChatMessageHandler(e, gift?.imageUrl)
        }
      })
  }

  const handleEmojiTransaction = (e, emoji) => {
    e.preventDefault()
    const payload = {
      actionType: "SendEmoji",
      receiverId: announcementId,
    }
    dispatch(gifTransactionAction(payload)).then(unwrapResult)
      .then((result) => {
        if (result.data.success) {
          onChatMessageHandler(e, emoji)
        }
      })
  }

  const onChatMessageHandler = (e, attachment) => {
    e.preventDefault();
    const payload = {
      message: message,
      sender: user.id,
      receiver: announcementId,
      seen: false,
    };

    if (attachment) {
      payload.attachments = attachment
    }
    if (mediaAttachment) {
      payload.attachments = mediaAttachment
    }
    if (moderatorIds) {
      payload.moderatorIds = moderatorIds
    }

    setMessage(``)
    setShowSmile(false)
    setMsgImage(``)
    setMediaAttachment(``)
    setOpenGiftModal(``)

    // sending message now
    sendMessage(payload);
  };

  useEffect(() => {
    chatHistoryRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  function handleShowSmile() {
    setShowSmile(!showSmile);
    if (!showSmile && !emojis.length) {
      setIsLoading(true)
      dispatch(fetchEmojis())
        .then(unwrapResult)
        .then((result) => {
          setIsLoading(false)
          if (result.length) {
            setEmojis(result.reverse())
          }
          else {
            setShowSmile(false)
          }

        })
        .catch((error) => {
          setIsLoading(false)
        });
    }
  }

  return (
    <Fragment>
      <div className={styled.userAnnoucementChatright}>
        <div className={styled.farvChatDetails}>
          <div className={styled.farvChatDetailsHead}>
            <div className={styled.headl}>
              <h2>{currentSelectedUser.userName}</h2>
              {/* <p>on-line</p> */}
            </div>
            <div className={styled.headr}>
              <ul>
                <li onClick={() => {
                  if (!openGiftModal)
                    handleGiftModal()
                }}
                >
                  <img src={GiftIcon} alt=' ' />
                  <Modal
                    open={openGiftModal}
                    onClose={() => setOpenGiftModal(false)}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={style}>
                      <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                        sx={{ textAlign: 'center', marginBottom: '10px', fontSize: '26px' }}
                      >
                        Gift Box
                      </Typography>
                      <Box>
                        <ul className={styled.modelGiftsSection}>
                          {gifts?.map((gifts, index) => (
                            <li>
                              <img src={`${gifts?.imageUrl}`} alt='' key={"gift" + index}
                                onClick={(e) => handleGiftTransaction(e, gifts)}
                              />
                              <h4>{gifts?.cost}</h4>
                              <h2>{gifts?.action}</h2>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    </Box>
                  </Modal>
                </li>
                {/* <li>
                  <img src={DeleteChat} alt=' ' />
                </li> */}
              </ul>
            </div>
            <div className={styled.clear}></div>
          </div>
          <div className={styled.farvChatDetailsBody}>
            <div className={styled.chat_history} >
              <ul>
                {messages?.map((message, index) => (
                  <li className={announcementId === message.receiver ? styled.clear : ''} key={"msg" + index}>
                    {announcementId === message.sender ? (
                      <>
                        <div className={styled.message_data} style={{ textAlign: 'left' }}>
                          &nbsp; &nbsp;
                          <i className={styled.circle_online}></i>
                          <span className={styled.message_data_name}>{currentSelectedUser.userName}</span>
                          <span className={styled.message_data_time}>
                            {new Date(message.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div
                          className={`${styled.message} ${announcementId === message.sender ? styled.my_message : styled.other_message
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

                    ) : user.id === message.sender && (
                      <>
                        <div className={styled.message_data} style={{ textAlign: 'right' }}>
                          <span className={styled.message_data_time}>
                            {new Date(message.createdAt).toLocaleString()}
                          </span>
                          <i className={styled.circle_online}></i>
                          <span className={styled.message_data_name}>{user.userName}</span>
                          &nbsp; &nbsp;
                        </div>
                        <div
                          className={`${styled.message} ${announcementId === message.sender ? styled.my_message : styled.other_message
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

          {/* create message section */}
          <div className={styled.farvChatDetailsFoot}>
            <form onSubmit={onChatMessageHandler}>
              <div className={styled.farvChatDetailsFootl}>
                <ul>
                  <li>
                    {msgImage ? <img src={ClosePng} alt='' onClick={() => {
                      setMsgImage(``)
                      setMediaAttachment(``)
                    }} /> :
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
                  </li>
                  <li onClick={handleShowSmile}>
                    <img src={ImageSmileChat} alt='' />
                    {showSmile &&
                      <div className={styled.smileicons}>
                        {isLoading ?
                          <CircularProgress color='secondary' size={30} style={{ marginTop: '4px', marginLeft: "45%" }} /> :
                          emojis.length > 0 && emojis.map((emoji, index) => (
                            <button onClick={(e) => handleEmojiTransaction(e, emoji)} key={index}>
                              <img src={emoji} alt='emoji' />
                            </button>
                          ))
                        }
                        {/* {showPopup && (
                            <Popup open position="right center">
                              <div className={styled.popup}>Not Enough Coins</div>
                            </Popup>
                          )} */}
                      </div>
                    }
                  </li>
                  {/* <li>
                    <img src={ImageGifChat} alt='' />
                  </li> */}
                </ul>
              </div>
              <div className={styled.farvChatDetailsFootas}>
                <textarea
                  id='messageTexarea'
                  cols='2000'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className={styled.farvChatDetailsFootr}>
                <ul>
                  <li>
                    <button>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </li>
                </ul>
              </div>

              <div className={styled.clear}></div>
            </form>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default UserAnnoucement;
