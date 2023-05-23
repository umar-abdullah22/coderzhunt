import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from './style.module.css';
import ProfilePic from '../../../../assets/images/profile_pic.jpg';
import LogoPic from '../../../../assets/images/logo_main.png';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const amdinUsername = user.firstName;

  const toggleDropdown = () => {
    setIsDropdownShown(!isDropdownShown);
  };

  const logout = () => {
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
    <div>
      <div className={styled.headerMain}>
        <div className={styled.headerInner}>
          <div className={styled.headLeft}>
            <Link to='/admin/Dashboard'>
              <img src={LogoPic} alt='' />
            </Link>
          </div>
          <div className={styled.headRight}>
            {/* <div className={styled.menuanme}>
                        <h3>Admin Panel</h3>
                    </div> */}
            <div className={styled.userprofile}>
              <div className={styled.userinner} onClick={toggleDropdown}>
                <p>{amdinUsername}</p>
                <img src={ProfilePic} alt='' />
                {/* <span>{'>'}</span> */}
              </div>
              {isDropdownShown && (
                <div className={styled.dropdownNav}>
                  <ul>
                    {/* <li>
                      <Link to='#'>Profile</Link>
                    </li> */}
                    <li>
                      <button onClickCapture={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styled.clear}></div>
          </div>
          <div className={styled.clear}></div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
