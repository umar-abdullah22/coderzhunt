import React from 'react';
import styled from './style.module.css';
import ProfileImage from '../../../assets/images/profile_image.jpg';
import { Link } from 'react-router-dom';

export const HeaderRight = () => {
  return (
    <>
      <div className={styled.HeaderRight1}>
        <ul className={styled.headerTogglePanel}>
          <li>
            <Link to='/moderator/home'>Show Analytics Panel</Link>
          </li>
          <li>
            <Link to='/moderator/moderator'>Show Moderator Panel</Link>
          </li>
        </ul>
        <div className={styled.headerSelection}>
          <div className={styled.headerSelectImg}>
            <img src={ProfileImage} alt='' />
            <span>Moderator</span>
          </div>
          <div className={styled.headerSelectdropdown}>
            <ul>
              <li>
                <Link to=''>Moderator</Link>
              </li>
              <li>
                <Link to=''>Home</Link>
              </li>
              <li>
                <Link to=''>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
