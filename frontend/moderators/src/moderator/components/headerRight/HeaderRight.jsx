import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from './style.module.css';
import ProfileImage from '../../../assets/images/profile_image.jpg';
import { useUser } from '../../../providers/useUser';


export const HeaderRight = () => {
  const { setToken, setLoggedInUser } = useUser()
  const navigate = useNavigate();
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownShown(!isDropdownShown);
  };

  const logout = () => {
    setLoggedInUser(null)
    setToken(null)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    if (window.history && window.history.pushState) {
      window.history.pushState('', null, './');
      window.onpopstate = function () {
        window.history.pushState('', null, './');
      };
    }
  };

  return (
    <>
      <div className={styled.HeaderRight1}>
        <ul className={styled.headerTogglePanel}>
          <li>
            <Link to='/home'>Analytics Panel</Link>
          </li>
          <li>
            <Link to='/moderator'>Moderator Panel</Link>
          </li>
          <li>
            <Link to='/visit-fake-users'>Visit Fake Users</Link>
          </li>
        </ul>
        <div className={styled.headerSelection}>
          <div className={styled.headerSelectImg} onClick={toggleDropdown}>
            <img src={ProfileImage} alt='' />
            <span>Moderator</span>
          </div>
          {isDropdownShown && (
            <div className={styled.headerSelectdropdown}>
              <ul>
                <li>
                  <Link to='/home'>Home</Link>
                </li>
                <li>
                  <Link to='/moderator'>Moderator</Link>
                </li>
                <li>
                  <Link to="/visit-fake-users">Fake users</Link>
                </li>
                <li>
                  <button onClickCapture={logout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
