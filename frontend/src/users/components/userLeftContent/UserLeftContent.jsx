import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from './style.module.css';
import UserIconHome from '../../../assets/images/userhomeicon.svg';
import UserAnnoucementIcon from '../../../assets/images/useraccouncementicon.svg';
import UserFavourites from '../../../assets/images/userfavicon.svg';
import UserProfileVisior from '../../../assets/images/userprofileicon.svg';
import userLogout from '../../../assets/images/userlogouticon.svg';
import Image1Dice from '../../../assets/images/img1Dice.svg';
import Image2Dice from '../../../assets/images/img2Dice.svg';
// import UserHome from "../../../pages/userhome/UserHome";

const UserLeftContent = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const userInfo = JSON.parse(localStorage.getItem("user")).userName;


  return (
    <div className={styled.userLetfMenu}>
      <div className={styled.profileSec}>
        <div className={styled.imgUser}>
          <img src='../../../assets/images/profilepic.jpg' alt='' />
        </div>
        <div className={styled.contentUuser}>
          <h3>{userInfo}</h3>
          <Link href='/premium'>
            <p>
              <span>18</span>
            </p>
            <img src='../../../assets/images/coinuser.svg' alt='' />
            <p>
              <span>top up account</span>
            </p>
          </Link>
        </div>
        <div className='clear'></div>
      </div>
      <div className={styled.userLeftNav}>
        <ul>
          <li>
            <Link to='/user/userHome'>
              <img src={UserIconHome} alt='as' /> Home page
            </Link>
          </li>
          <li>
            <Link to='/user/userAnnoucements'>
              <img src={UserAnnoucementIcon} alt='as' />
              Annoucements
            </Link>
          </li>
          <li>
            <Link to='/user/userFavourites'>
              <img src={UserFavourites} alt='as' />
              Favourites
            </Link>
          </li>
          <li>
            <Link to='/user/userProfileVisior'>
              <img src={UserProfileVisior} alt='as' />
              Profile Visior
            </Link>
          </li>
          <li>
            <Link to='/user/subscription'>
              <img src={UserProfileVisior} alt='as' />
              Top up account
            </Link>
          </li>
          <li>
            <img src={userLogout} alt='as' />
            <button onClickCapture={logout}>Logout</button>
          </li>
        </ul>
        <div className='clear'></div>
      </div>

      <div className={styled.UserleftSuprise}>
        <img className={styled.img1dice} src={Image1Dice} alt='' />
        <img className={styled.img2dice} src={Image2Dice} alt='' />
        <Link href='#'>Suprise me!</Link>
        <p>Dice and let yourself be suprised!</p>
        <div className='clear'></div>
      </div>
      <div className={styled.userCopyright}>
        <ul>
          <li>
            <Link to='/user/data-protection'>Data protection</Link>
          </li>
          <li>
            <Link to='/user/term-of-use'>Term of Use</Link>
          </li>
          <li>
            <Link to='/user/imprint'>Imprint</Link>
          </li>
        </ul>
        <p>Contact &copy; - Zizle - Made with &#10084;</p>
        <div className='clear'></div>
      </div>
    </div>
  );
};

export default UserLeftContent;
