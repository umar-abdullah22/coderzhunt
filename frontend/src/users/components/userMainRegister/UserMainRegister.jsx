/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from './style.module.css';
import LogoMain from '../../../assets/images/logo_main.png';
import ForHim from '../../../assets/images/forHim.svg';
import ForHer from '../../../assets/images/forHer.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { resigterUserAction, userLoginAction } from '../../../store/slices/userAuth/actions';
import { unwrapResult } from '@reduxjs/toolkit';

export default UserMainRegister = () => {
  const { successMessage } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (successMessage === null) return;
    resetRegisterForm();
  }, [successMessage]);

  let navigate = useNavigate();

  const [selfGender, setSelfGender] = useState('');
  const [interestedGender, setInterestedGender] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginpassword, setLoginPassword] = useState('');

  const resetRegisterForm = () => {
    setSelfGender('');
    setInterestedGender('');
    setUserName('');
    setEmail('');
    setPassword('');
  };

  const loginSubmitHandler = (event) => {
    if (loginEmail.length === 0) {
      return 0;
    }
    event.preventDefault();
    const payload = {
      email: loginEmail,
      password: loginpassword,
    };

    dispatch(userLoginAction(payload))
      .then(unwrapResult)
      .then((result) => {
        localStorage.setItem('token', result?.data?.access_token);
        localStorage.setItem('user', JSON.stringify(result.data.user));

        if (result?.data?.user?.role === 'CUSTOMER') {
          navigate('/user/userHome');
        }
        if (result?.data?.user?.role === 'ADMIN') {
          navigate('/admin/Dashboard');
        }
        if (result?.data?.user?.role === 'MODERATOR') {
          navigate('/moderator/home');
        }
      })
      .catch((error) => {
        localStorage.setItem('userCatchEamil', payload.email);
        localStorage.setItem('userCatchStatusCode', error?.response?.data?.statusCode);
        localStorage.setItem('userCatchMessage', error?.response?.data?.message);

        navigate('/user/userHome', { state: { email: payload?.email } });
      });
  };

  const resigterSubmitHandler = (event) => {
    event.preventDefault();

    const payload = {
      selfGender,
      interestedGender,
      userName,
      email,
      password,
    };

    dispatch(resigterUserAction(payload));
  };

  return (
    <>
      <div className={styled.loginScreen}>
        <div className={styled.wrapwidth}>
          <div className={styled.loginFrom}>
            <form
              onSubmit={(e) => {
                loginSubmitHandler(e);
              }}
            >
              <div className={styled.formGroup}>
                <input
                  type='text'
                  placeholder='Email'
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <span>
                  {loginEmail.length === 0 ? 'Enter Username' : (e) => setUserName(e.target.value)}
                </span>
              </div>
              <div className={styled.formGroup}>
                <input
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <span>
                  {loginpassword.length === 0
                    ? 'Enter Username'
                    : (e) => setUserName(e.target.value)}
                </span>
              </div>
              <div className={styled.formGroup}>
                <button>Submit</button>
              </div>
              <div className={styled.clear}></div>
            </form>
          </div>
        </div>
      </div>
      <div className={styled.homeMainRegister}>
        <div className={styled.wrapwidth}>
          <div className={styled.homeMainRegl}>
            <div className={styled.logoSec}>
              <Link to='/'>
                <img src={LogoMain} alt='a' />
                <h2>Zizle</h2>
              </Link>
            </div>
            <div className={styled.afterLogoSec}>
              <h3>MORE THAN JUST A DATE</h3>
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
                    <label htmlFor='iamMale' className={styled.selector_item_label}>
                      Male
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
                    <label htmlFor='iamFemale' className={styled.selector_item_label}>
                      Female
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
                    <label htmlFor='intrestedinMale' className={styled.selector_item_label}>
                      Male
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
                    <label htmlFor='intrestedinFemale' className={styled.selector_item_label}>
                      Female
                    </label>
                  </div>
                  <div className={styled.clear}></div>
                </div>
                <div className={styled.form_btns}>
                  <div className={styled.formSec}>
                    <input
                      type='text'
                      placeholder='Username'
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <span>
                      {userName.length === 0
                        ? 'Enter Username'
                        : (e) => setUserName(e.target.value)}
                    </span>
                    <input
                      type='email'
                      placeholder='Email-address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>
                      {email.length === 0 ? 'Enter Email' : (e) => setEmail(e.target.value)}
                    </span>
                    <input
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>
                      {password.length === 0
                        ? 'Enter Password'
                        : (e) => setPassword(e.target.value)}
                    </span>
                  </div>
                  <button>Register for free</button>
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
            <ul>
              <li>
                <Link to='/'>
                  {/* <FontAwesomeIcon icon={faGoogle} /> */}
                  <FontAwesomeIcon icon={faGoogle} />
                  Google Link
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faFacebookF} />
                <Link to='/'>Facebook Login</Link>
              </li>
              <li>
                <Link to='/'>
                  Login <span></span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styled.clear}></div>
        </div>
      </div>
    </>
  );
};
