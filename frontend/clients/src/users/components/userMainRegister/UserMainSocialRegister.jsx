/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from './style.module.css';
import LogoMain from '../../../assets/images/logo_main.png';
import ForHim from '../../../assets/images/forHim.svg';
import ForHer from '../../../assets/images/forHer.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgetPasswordAction,
  resigterUserAction,
  userLoginAction,
} from '../../../store/slices/userAuth/actions';
import { resigteroauthUserAction } from '../../../store/slices/userAuth/actions';
import { unwrapResult } from '@reduxjs/toolkit';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';
import FacebookLogin from '@greatsumini/react-facebook-login';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
// import { googleAndFacebookResp } from '../../../store/slices/socialResponce/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../../providers/useUser';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const UserMainSocialRegister = ({ navigation }) => {
  const location = useLocation();
  const { state } = location;
  const profileObj = state?.profile;
  const tokenId = state?.token;
  const socialProvider = state?.socialProvider;
  const googleAndFaceBookObj = useSelector((state) => state);
  const { successMessage } = useSelector((state) => state.userAuth);
  const [selfGender, setSelfGender] = useState('');
  const [interestedGender, setInterestedGender] = useState('');
  // const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginpassword, setLoginPassword] = useState('');

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState('');
  const token = googleAndFaceBookObj?.respState?.profileObj?.token;
  const firstHandleOpen = () => {
    setOpen(true);
  };
  const firstHandleClose = () => {
    setOpen(false);
  };
  const secondHandleOpen = () => {
    setOpen1(true);
  };
  const secondHandleClose = () => {
    setOpen1(false);
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToken, setUser } = useUser();

  const resetRegisterForm = () => {
    setSelfGender('');
    setInterestedGender('');
    setPassword('');
  };

  //TODO ADD ZIZLE ACCOUNTS

  const googleclientID = process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID;
  const facboookclientID = process.env.REACT_PUBLIC_FACEBOOK_CLIENT_ID;

  useEffect(() => {
    if (successMessage === null) return;
    resetRegisterForm();
  }, [successMessage]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleclientID,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  });
  const email = googleAndFaceBookObj?.respState?.profileObj?.profile?.email;
  const userName = googleAndFaceBookObj?.respState?.profileObj?.profile?.name;

  const resigterSubmitHandler = (event) => {
    event.preventDefault();

    const payload = {
      selfGender,
      interestedGender,
      userName: profileObj?.name,
      email: profileObj?.email,
      password,
      token: tokenId,
      socialProvider,
    };

    dispatch(resigteroauthUserAction(payload))
      .then(unwrapResult)
      .then((result) => {
        toast.success('Congratulation! You are successfully registered!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setToken(result?.access_token);
        setUser(result?.user);

        navigate('/profile');
      })
      .catch((error) => {});
    navigate('/profile');
  };
  const responseGoogle = async (response) => {
    // setEmail(googleAndFaceBookObj.respState.profileObj.profile.email)
    // setUserName(googleAndFaceBookObj.respState.profileObj.profile.email)
    const res = await axios.get(APIS.CHECK_EMAILS);
    var verifyUser = res.data.filter((element) => element === `${response.profileObj.email}`);
    const payload = { email: verifyUser[0] };
    if (verifyUser.length === 0 || verifyUser === undefined) {
      const payload = {
        accessToken: tokenId,
        socialProvider: 'google',
      };
      dispatch(resigteroauthUserAction(payload))
        .then(unwrapResult)
        .then((result) => {
          setToken(response.tokenId);
          setUser(result);
          navigate('/profile');
        })
        .catch((error) => {});

      navigate('/profile');
    }
    const getUserData = await axios.put(APIS.CHECK_USER, payload);

    setToken(response.tokenId);
    setUser(getUserData.data);
    // navigate('/userHome');
  };

  const getEmail = async (response) => {
    const res = await axios.get(APIS.CHECK_EMAILS);
    var verifyUser = res.data.filter((element) => element === `${response.email}`);

    const payload = { email: verifyUser[0] };
    if (verifyUser.length === 0 || verifyUser === undefined) {
      const payload = {
        accessToken: response.tokenId,
        socialProvider: 'facebook',
      };
      dispatch(resigteroauthUserAction(payload))
        .then(unwrapResult)
        .then((result) => {
          setToken(result.tokenId);
          response.userName = response.name;
          setUser(response);
          navigate('/profile');
          // navigate('/profile');
        })
        .catch((error) => {});
    }
    const getUserData = await axios.put(APIS.CHECK_USER, payload);
    setUser(getUserData.data);
    // navigate('/userHome');
  };
  const responseFacebook = async (response) => {
    setToken(response.accessToken);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleForgetPassword = (e) => {
    e.preventDefault();
    dispatch(forgetPasswordAction({ email }));
  };

  const [age, setAge] = useState(18);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setAge(newValue);
  };

  return (
    <>
      {/* {isDropdownShown && ( */}
      {/* <div className={styled.loginScreen}>
        <div className={styled.wrapwidth}></div>
      </div> */}
      {/* )} */}
      <div className={styled.homeMainRegister}>
        <div className={styled.wrapwidth}>
          <div className={styled.homeMainReg2}>
            <div className={styled.afterLogoSec}>
              <h3>Last step...</h3>
              <p>After entering your personal information, you can start meeting other people.</p>
            </div>
            <div className={styled.genderSec}>
              <form
                onSubmit={(e) => {
                  resigterSubmitHandler(e);
                }}
              >
                <div className={styled.forHim}>
                  <label>I am</label>
                  <div className={styled.selecotr_item}>
                    <img src={ForHim} alt='' />
                    <input
                      type='radio'
                      id='iamMale'
                      name='iam'
                      value='Male'
                      onChange={(e) => {
                        setSelfGender(e.target.value);
                      }}
                      checked={selfGender === 'Male'}
                      className={styled.selector_item_radio}
                    />
                    <label
                      htmlFor='iamMale'
                      className={styled.selector_item_label}
                      style={{ height: 'inherit' }}
                    >
                      Masculine
                    </label>
                  </div>
                  <div className={styled.selecotr_item}>
                    <img src={ForHer} alt='' />
                    <input
                      type='radio'
                      id='iamFemale'
                      onChange={(e) => {
                        setSelfGender(e.target.value);
                      }}
                      name='iam'
                      value='Female'
                      checked={selfGender === 'Female'}
                      className={styled.selector_item_radio}
                    />
                    <label
                      htmlFor='iamFemale'
                      className={styled.selector_item_label}
                      style={{ height: 'inherit' }}
                    >
                      Feminine
                    </label>
                  </div>
                  <div className={styled.clear}></div>
                </div>
                <div className={styled.forHer}>
                  <label>Interested in</label>
                  <div className={styled.selecotr_item}>
                    <img src={ForHim} alt='' />
                    <input
                      type='radio'
                      id='intrestedinMale'
                      onChange={(e) => {
                        setInterestedGender(e.target.value);
                      }}
                      name='intrestedin'
                      value='Male'
                      checked={interestedGender === 'Male'}
                      className={styled.selector_item_radio}
                    />
                    <label
                      htmlFor='intrestedinMale'
                      className={styled.selector_item_label}
                      style={{ height: 'inherit' }}
                    >
                      Masculine
                    </label>
                  </div>
                  <div className={styled.selecotr_item}>
                    <img src={ForHer} alt='' />
                    <input
                      type='radio'
                      id='intrestedinFemale'
                      onChange={(e) => {
                        setInterestedGender(e.target.value);
                      }}
                      name='intrestedin'
                      value='Female'
                      checked={interestedGender === 'Female'}
                      className={styled.selector_item_radio}
                    />
                    <label
                      htmlFor='intrestedinFemale'
                      className={styled.selector_item_label}
                      style={{ height: 'inherit' }}
                    >
                      Feminine
                    </label>
                  </div>
                  <div className={styled.clear}></div>
                </div>
                <div className={styled.form_btns}>
                  <div className={styled.formSec}>
                    <input
                      type='text'
                      // placeholder={googleAndFaceBookObj.respState.profileObj.profile.}
                      value={profileObj?.name}
                      // onChange={(e) => setUserName(e.target.value)}
                      // onChange={(e) => setUserName(googleAndFaceBookObj?.respState?.profileObj?.profile?.email)}
                    />
                    {/* <span>
                                            {userName?.length === 0
                                                ? 'Enter Username'
                                                : (e) => setUserName(e.target.value)}
                                        </span> */}
                    <input
                      type='email'
                      placeholder='Email-address'
                      value={profileObj?.email}
                      // onChange={(e) => setEmail(googleAndFaceBookObj.respState.profileObj.profile.email)}
                    />
                    <input type='text' placeholder='Birth place' />

                    <div className='slider-container'>
                      <div className='slider-bar'>
                        <div
                          className='slider-progress'
                          style={{ width: `${(age - 18) * 2}%` }}
                        ></div>
                        <input
                          type='range'
                          value={age}
                          onChange={handleSliderChange}
                          min={18}
                          max={100}
                          className='slider-handle'
                        />
                      </div>
                      <div className='slider-label'>Selected Age:</div>
                      <div className='slider-value'>{age}</div>
                    </div>
                  </div>
                  <button onClick={responseGoogle}>Register for free</button>
                </div>
              </form>
            </div>

            <div className={styled.cautionSec}>
              <ul>
                <li>Matching partners in your area</li>
                <li>Automatically checked profiles</li>
                <li>Safe and TÜV SÜD certified software</li>
              </ul>
            </div>
          </div>

          <div className={styled.homeMainRegr}>
            <div>
              <Modal
                open={open}
                onClose={firstHandleClose}
                aria-labelledby='parent-modal-title'
                aria-describedby='parent-modal-description'
              >
                <Box sx={{ ...style, width: 400 }}>
                  <Button
                    onClick={firstHandleClose}
                    className={styled.closeBtnModal}
                    sx={{
                      position: 'absolute',
                      right: '5px',
                      top: '5px',
                      backgroundColor: '#000',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#000',
                        color: '#fff',
                      },
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      padding: '15px',
                      margin: '0',
                      minWidth: 'auto',
                      fontSize: '12px',
                    }}
                  >
                    x
                  </Button>
                  <h2 id='parent-modal-title' style={{ textAlign: 'center' }}>
                    Login with email
                  </h2>
                  <ul className={styled.loginSocials}>
                    <li>
                      <GoogleLogin
                        clientId={googleclientID}
                        render={(renderProps) => (
                          <button
                            style={{ border: 0, cursor: 'pointer' }}
                            onClick={renderProps.onClick}
                          >
                            <FontAwesomeIcon icon={faGoogle} />
                            Google Login
                          </button>
                        )}
                        buttonText='Login'
                        conSucess={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                    </li>
                    <li>
                      <FacebookLogin
                        appId={facboookclientID}
                        onSuccess={responseFacebook}
                        onFail={(error) => {}}
                        onProfileSuccess={getEmail}
                        render={({ onClick }) => (
                          <button style={{ border: 0, cursor: 'pointer' }} onClick={onClick}>
                            <FontAwesomeIcon icon={faFacebookF} />
                            Facebook Login
                          </button>
                        )}
                        style={{ border: 'none' }}
                      />
                    </li>
                  </ul>
                  <p id='parent-modal-description' style={{ textAlign: 'center' }}>
                    or
                  </p>

                  <form
                  // onSubmit={(e) => {
                  //     loginSubmitHandler(e);
                  // }}
                  >
                    <div className={styled.formGroup}>
                      <input
                        type='text'
                        placeholder='Email'
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                      {/* <span>
                                                {loginEmail.length === 0
                                                    ? 'Enter Username'
                                                    : (e) => setUserName(e.target.value)}
                                            </span> */}
                    </div>
                    <div className={styled.formGroup}>
                      <input
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      {/* <span>
                                                {loginpassword.length === 0
                                                    ? 'Enter Username'
                                                    : (e) => setUserName(e.target.value)}
                                            </span> */}
                    </div>
                    <div className={styled.formGroup}>
                      <button>Submit</button>
                    </div>
                    <div className={styled.clear}></div>
                  </form>

                  <React.Fragment>
                    <Button
                      onClick={secondHandleOpen}
                      style={{ textAlign: 'center', margin: '15px auto 0', display: 'block' }}
                    >
                      Forgot your password?
                    </Button>
                    <Modal
                      open={open1}
                      onClose={secondHandleClose}
                      aria-labelledby='child-modal-title'
                      aria-describedby='child-modal-description'
                    >
                      <Box sx={{ ...style, width: 400 }}>
                        <Button
                          onClick={secondHandleClose}
                          className={styled.closeBtnModal}
                          sx={{
                            position: 'absolute',
                            right: '5px',
                            top: '5px',
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#000',
                              color: '#fff',
                            },
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            padding: '15px',
                            margin: '0',
                            minWidth: 'auto',
                            fontSize: '12px',
                          }}
                        >
                          x
                        </Button>
                        <h2 id='parent-modal-title' style={{ textAlign: 'center' }}>
                          Reset Password
                        </h2>
                        <p id='parent-modal-description' style={{ textAlign: 'center' }}>
                          You can reset your password with an email to your email address.
                        </p>
                        <form onClick={handleForgetPassword}>
                          <div className={styled.formGroup}>
                            <input
                              type='email'
                              placeholder='Email'
                              value={email}
                              onChange={handleEmailChange}
                            />
                          </div>
                          <div className={styled.formGroup}>
                            <button>Submit</button>
                          </div>
                        </form>
                      </Box>
                    </Modal>
                  </React.Fragment>
                </Box>
              </Modal>
            </div>
          </div>
          <div className={styled.clear}></div>
        </div>
      </div>
    </>
  );
};

export default UserMainSocialRegister;
