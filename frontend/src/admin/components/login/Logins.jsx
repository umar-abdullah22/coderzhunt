import React, { useState, useEffect } from 'react';
import styled from './style.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { userLoginAction } from '../../../store/slices/userAuth/actions';

const Logins = () => {
  const navigate = useNavigate();

  const { successMessage } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const resetRegisterForm = () => {
    setAdminEmail('');
    setAdminPassword('');
  };

  useEffect(() => {
    if (successMessage === null) return;
    resetRegisterForm();
  }, [successMessage]);

  const adminLoginSubmitHandler = (event) => {
    if (adminEmail.length === 0) {return}
    event.preventDefault();
    const payload = {
      email: adminEmail,
      password: adminPassword,
    };

    dispatch(userLoginAction(payload))
      .then(unwrapResult)
      .then((result) => {
        localStorage.setItem('token', result?.data?.access_token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        if (result?.data?.user?.role === 'ADMIN') {
          navigate('/admin/Dashboard', {
            successMsg: {
              email: result?.data?.user?.email,
              status: result?.data?.user?.status,
              id: result?.data?.user?.id,
            },
          });
        }
        if (result?.data?.user?.role === 'MODERATOR') {
          navigate('/moderator/home', {
            successMsg: {
              email: result?.data?.user?.email,
              status: result?.data?.user?.status,
              id: result?.data?.user?.id,
            },
          });
        }
      })
      .catch((error) => {
      });
  };

  return (
    <div>
      <div className={styled.container_login100}>
        <div
          className={`${styled.wrap_login100} ${styled.p_l_55} ${styled.p_r_55} ${styled.p_t_65} ${styled.p_b_54}`}
        >
          <form
            className={`${styled.login100_form} ${styled.validate_form}`}
            onSubmit={(e) => {
              adminLoginSubmitHandler(e);
            }}
          >
            <span className={`${styled.login100_form_title} ${styled.p_b_20}`}>Login</span>
            <div className={styled.loginRegisterText}>
              <p>
                New Here? <Link to='/admin/Register'>Create an Account</Link>
              </p>
            </div>
            <div
              className={`${styled.wrap_input100} ${styled.validate_input} ${styled.m_b_23}`}
              data-validate='Username is reauired'
            >
              <span className={styled.label_input100}>Username</span>
              <input
                className={styled.input100}
                type='text'
                name='username'
                placeholder='Type your username'
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              {/* <span className={styled.focus_input100} data-symbol=""></span> */}
            </div>
            <div
              className={`${styled.wrap_input100} ${styled.validate_input}`}
              data-validate='Password is required'
            >
              <span className={styled.label_input100}>Password</span>
              <input
                className={styled.input100}
                type='password'
                name='pass'
                placeholder='Type your password'
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              {/* <span className={styled.focus_input100} data-symbol=""></span> */}
            </div>
            <div className={`${styled.text_right} ${styled.p_t_8} ${styled.p_b_0}`}>
              <Link to='#'>Forgot password?</Link>
            </div>
            <div className={styled.container_login100_form_btn}>
              <div className={styled.wrap_login100_form_btn}>
                <div className={styled.login100_form_bgbtn}></div>
                <button className={styled.login100_form_btn}>Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Logins;
