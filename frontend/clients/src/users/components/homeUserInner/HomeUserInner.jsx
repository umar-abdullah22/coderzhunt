import React, { useMemo, useRef } from 'react';
import { faBan, faGift, faPaperPlane, faUnlock } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SmileIcon from '@mui/icons-material/EmojiEmotions';
import HeartIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserVerified from '../../../assets/images/userVerified.svg';
import { useUser } from '../../../providers/useUser';
import {
  addToBlockList,
  addToFavourite,
  blockedUsersListAction,
  favouriteUsersList,
  getUserByIdAction,
  removeFromBlockListAction,
  userGiftListAction,
  visitedProfile,
} from '../../../store/slices/customerAPI/action';
import UserHeaderButtons from '../../components/userHeaderButtons/UserHeaderButtons';
import UserHeaderLogo from '../../components/userHeaderLogo/UserHeaderLogo';
import UserLeftContent from '../../components/userLeftContent/UserLeftContent';
import styled from './style.module.css';
import { useConnection } from '../../../socket/SocketConnection';
import {
  fetchEmojis,
  userCoinCostAction,
  userCointransactionAction,
} from '../../../store/slices/userAuth/actions';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { gifTransactionAction } from './../../../store/slices/customerAPI/action';
import { CircularProgress } from '@mui/material';

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

const HomeUserInner = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [gifts, setGifts] = useState();
  // const gifts = useSelector(state => state.customerAPI?.gifts);
  const [refresh, setRefresh] = useState(false);
  const [listFavUser, setListFavUser] = useState([]);
  const [blockedList, setBlockedList] = useState([]);
  const [message, setMessage] = useState('');
  // const [isBlocked, setIsBlocked]      = useState(false);

  const id = useMemo(() => {
    const url = window.location.href;
    const regex = /\/profile\/?(.*)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }, [window.location.href]);

  const dispatch = useDispatch();
  const { token, user } = useUser();
  const [coinData, setCoinData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emojis, setEmojis] = useState(``);
  const [open, setOpen] = useState(false);
  const favouritesListFetched = useRef(false);

  const { sendMessage } = useConnection();

  const handleOpen = () => {
    setOpen(true);

    dispatch(userGiftListAction())
      .then(unwrapResult)
      .then((result) => {
        setGifts(result);
      })
      .catch((error) => {
      });
  };
  const handleClose = () => setOpen(false);

  const [showSmile, setShowSmile] = useState(false);

  function handleShowSmile() {
    setShowSmile(!showSmile);
    if (!showSmile && !emojis.length) {
      setIsLoading(true);
      dispatch(fetchEmojis())
        .then(unwrapResult)
        .then((result) => {
          setIsLoading(false);
          if (result.length) {
            setEmojis(result.reverse());
          } else {
            setShowPopup(true);
            setShowSmile(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }
  function calculateAge(birthDateString) {
    var birthDate = new Date(birthDateString);
    var difference = Date.now() - birthDate.getTime();
    var ageDate = new Date(difference);
    var calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge ? calculatedAge : '';
  }

  const payload = {
    id,
    token,
  };

  const handleGiftTransaction = (e, gift) => {
    e.preventDefault();
    const payload = {
      actionType: 'SendGift',
      receiverId: id,
      subAction: gift.actionType,
    };
    dispatch(gifTransactionAction(payload))
      .then(unwrapResult)
      .then((result) => {
        if (result.data.success) {
          onChatMessageHandler(e, gift?.imageUrl);
        }
      });
  };

  const handleEmojiTransaction = (e, emoji) => {
    e.preventDefault();
    const payload = {
      actionType: 'SendEmoji',
      receiverId: id,
    };
    dispatch(gifTransactionAction(payload))
      .then(unwrapResult)
      .then((result) => {
        if (result.data.success) {
          onChatMessageHandler(e, emoji);
        }
      });
  };

  const handleUnlock = (id) => {
    const payload = {
      actionType: 'SendEmoji',
      receiverId: id,
    };
    dispatch(userCointransactionAction(payload))
      .then(unwrapResult)
      .then((result) => {
        if (result.data.success) {
          setMessage(id);
          setShowSmile(false);
          visitProfiledata();
          getfavProfileList();
          getBockedUsers();
        } else {
          setShowPopup(true);
          setShowSmile(false);
        }
      })
      .catch((error) => {
      });
  };

  // visitProfiledata function
  const visitProfiledata = () => {
    dispatch(visitedProfile(payload));

    dispatch(getUserByIdAction(payload))
      .then(unwrapResult)
      .then((result) => {
        setSelectedUser(result);
      })
      .catch((error) => {
      });

    dispatch(userCoinCostAction())
      .then(unwrapResult)
      .then((result) => {
        setCoinData(result);
      })
      .catch((error) => {
      });
  };

  const getfavProfileList = () => {
    const payload = {
      token,
    };
    dispatch(favouriteUsersList(payload))
      .then(unwrapResult)
      .then((result) => {
        setListFavUser(result.map((d) => d.favorites.id));
      })
      .catch((error) => {
      });
  };

  // blockedUsersList function

  const getBockedUsers = () => {
    const payload = {
      token,
    };
    dispatch(blockedUsersListAction(payload))
      .then(unwrapResult)
      .then((result) => {
        setBlockedList(result.map((d) => d.blocked.id));
      })
      .catch((error) => {
      });
  };

  const clickHandler = async () => {
    await dispatch(addToFavourite(payload));
    getfavProfileList();
  };

  const handleUnBlockClick = async () => {
    await dispatch(removeFromBlockListAction(payload));
    getBockedUsers();
  };

  const handleBlockClick = async () => {
    // setIsBlocked(false)
    await dispatch(addToBlockList(payload));
    getBockedUsers();
  };

  useEffect(() => {
    if (favouritesListFetched.current) return;
    favouritesListFetched.current = true;
    visitProfiledata();
    getfavProfileList();
    getBockedUsers();
  }, []);

  function getLikeStatus() {
    const favUser = listFavUser.find((u) => u === id);
    if (favUser) {
      return 'Unlike';
    }
    return 'I Like';
  }

  const getBlockedStatus = () => {
    const blockedUser = blockedList.find((u) => u === id);
    if (blockedUser) {
      return (
        <>
          <li onClick={handleUnBlockClick}>
            <FontAwesomeIcon icon={faUnlock} title='Un Block' />
          </li>
        </>
      );
    }

    return (
      <>
        <li onClick={handleBlockClick}>
          <FontAwesomeIcon icon={faBan} title='Block' />
        </li>
      </>
    );
  };


  const onChatMessageHandler = (e, attachment) => {
    e.preventDefault();
    const payload = {
      sender: user.id,
      message: message,
      seen: false,
      receiver: id,
    };
    if (attachment) {
      payload.attachments = attachment;
    }
    setShowSmile(false);
    setMessage(``);
    setOpen(false);
    sendMessage(payload);
  };
  return (
    <div>
      <div className={styled.mainInner}>
        <div className={styled.innerUserDetails}>
          <div className={styled.innerUserDetails1}>
            <div className={styled.innerUserDetailsLeft}>
              <img src={`${selectedUser?.profile?.avatarUrl}`} alt='' />
            </div>
            <div className={styled.innerUserDetailsRight}>
              <div className={styled.giftStatus}>
                <div className={styled.statusShow}>
                  <span>{selectedUser?.online}</span>
                </div>
                <div className={styled.giftBan}>
                  <ul>
                    <li>
                      <button onClick={handleOpen}>
                        <FontAwesomeIcon icon={faGift} />
                      </button>
                      <Modal
                        open={open}
                        onClose={handleClose}
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
                                  <img
                                    src={`${gifts?.imageUrl}`}
                                    alt=''
                                    key={index}
                                    onClick={(e) => handleGiftTransaction(e, gifts)}
                                  />
                                  {/* {gifts.imageUrl}/ */}
                                  <h4>{gifts?.cost}</h4>
                                  <h2>{gifts?.action}</h2>
                                </li>
                              ))}
                            </ul>
                          </Box>
                        </Box>
                      </Modal>
                    </li>
                    {getBlockedStatus()}
                  </ul>
                  <div className={styled.clear}></div>
                </div>
                <h2>{selectedUser?.userName}</h2>
                {/* {selectedUser?.profile.isProfileVerified === 'VERIFIED' && (  */}
                <div className={styled.homeUserNewVerified}>
                  <img src={UserVerified} alt='' />
                </div>
                {/* )} */}
              </div>
              <form onSubmit={onChatMessageHandler}>
                <div className={styled.reactbutton}>
                  <ul>
                    <li>
                      <Button
                        sx={{
                          color: '#ffffff',
                          backgroundColor: '#facc15',
                          ':hover': {
                            backgroundColor: '#ff7c6d', // theme.palette.primary.main
                            color: 'white',
                          },
                        }}
                        variant='outlined'
                        startIcon={<SmileIcon />}
                        onClick={handleShowSmile}
                      >
                        Smile
                      </Button>
                      {showSmile && (
                        <div className={styled.smileicons}>
                          {isLoading ? (
                            <CircularProgress
                              color='secondary'
                              size={30}
                              style={{ marginTop: '4px' }}
                            />
                          ) : (
                            emojis.length > 0 &&
                            emojis.map((emoji, index) => (
                              <button onClick={(e) => handleEmojiTransaction(e, emoji)} key={index}>
                                <img src={emoji} alt='emoji' />
                              </button>
                            ))
                          )}
                          {showPopup && (
                            <Popup open position='right center'>
                              <div className={styled.popup}>Not Enough Coins</div>
                            </Popup>
                          )}
                        </div>
                      )}
                    </li>
                    <li>
                      <Button
                        sx={{
                          color: '#ffffff',
                          backgroundColor: '#db2777',
                          ':hover': {
                            backgroundColor: '#ff7c6d ', // theme.palette.primary.main
                            color: 'white',
                          },
                        }}
                        variant='outlined'
                        startIcon={<HeartIcon />}
                        onClick={clickHandler}
                      >
                        {getLikeStatus()}
                      </Button>
                    </li>
                  </ul>
                </div>
                <div className={styled.textMessages}>
                  <textarea
                    placeholder=''
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </form>
            </div>
            <div className={styled.clear}></div>
            <div className={styled.personalDetails}>
              <ul>
                <li>
                  <h5>Gender</h5>
                  <p>{selectedUser?.selfGender}</p>
                </li>
                <li>
                  <h5>Age</h5>
                  <p>{calculateAge(selectedUser?.profile?.dateOfBirth)}</p>
                </li>
                <li>
                  <h5>Relationship Status</h5>

                  <p>{selectedUser?.profile?.relationshipStatus}</p>
                </li>
                <li>
                  <h5>Children</h5>
                  <p>{selectedUser?.profile?.children}</p>
                </li>
                <li>
                  <h5>Life</h5>
                  <p>{selectedUser?.profile?.life}</p>
                </li>
                <li>
                  <h5>Smoker</h5>
                  <p>{selectedUser?.profile?.smoker}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={styled.clear}></div>
          {/* <div className={styled.personalDetails}>
            <ul>
              <li>
                <h5>Gender</h5>
                <p>{selectedUser?.selfGender}</p>
              </li>
              <li>
                <h5>Age</h5>
                <p>{calculateAge(selectedUser?.profile?.dateOfBirth)}</p>
              </li>
              <li>
                <h5>Relationship Status</h5>

                <p>{selectedUser?.profile?.relationshipStatus}</p>
              </li>
              <li>
                <h5>Children</h5>
                <p>{selectedUser?.profile?.children}</p>
              </li>
              <li>
                <h5>Life</h5>
                <p>{selectedUser?.profile?.life}</p>
              </li>
              <li>
                <h5>Smoker</h5>
                <p>{selectedUser?.profile?.smoker}</p>
              </li>
            </ul>
          </div> */}
        </div>

        <div className={`${styled.innerUserDetails1} ${styled.innerUserBottom}`}>
          <ul>
            <h3>Photos {selectedUser?.photos?.length}</h3>
            {selectedUser?.photos?.map((userPhotos) => (
              <li>
                <img src={`${userPhotos?.photos}`} alt='' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeUserInner;
