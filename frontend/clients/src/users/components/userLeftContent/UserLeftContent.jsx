import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from './style.module.css';
import UserIconHome from '../../../assets/images/userhomeicon.svg';
import UserAnnoucementIcon from '../../../assets/images/useraccouncementicon.svg';
import UserFavourites from '../../../assets/images/userfavicon.svg';
import UserProfileVisior from '../../../assets/images/userprofileicon.svg';
import UserTopUpAccount from '../../../assets/images/topupaccount.svg';

import subscription from '../../../assets/images/subscription.svg';
import Image1Dice from '../../../assets/images/img1Dice.svg';
import Image2Dice from '../../../assets/images/img2Dice.svg';
import Logout from '../../../assets/images/userlogouticon.svg';
import UserCoin from '../../../assets/images/coinuser.svg';
import ProfileImage from '../../../assets/images/profile_pic.jpg';
// import UserHome from "../../../pages/userhome/UserHome";
import { useConnection } from '../../../socket/SocketConnection';
import { useSelector, useDispatch } from 'react-redux';
import { userCoinAction } from '../../../store/slices/userAuth/actions';
import { unwrapResult } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import MenuIcon from '../../../assets/images/navMenu.png';
import MenuClose from '../../../assets/images/navClose.png';

import { Outlet } from 'react-router-dom';
import UserHeaderLogo from '../userHeaderLogo/UserHeaderLogo';
import UserHeaderButtons from '../userHeaderButtons/UserHeaderButtons';
import { useUser } from '../../../providers/useUser';
import Footer from '../footer/Footer';
const UserLeftContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listData, setListData] = useState('');
  const { token, user, setToken, setUser } = useUser();
  const dataFetchedRef = useRef(false);
  const [isMobileVersionVisible, setIsMobileVersionVisible] = useState(false);

  const { socket, userCount } = useConnection();
  const avatarImage = user?.profile?.avatarUrl;

  useEffect(() => {
    const fetchUsersList = () => {
      const payload = { token };
      dispatch(userCoinAction(payload))
        .then(unwrapResult)
        .then((result) => {
          setListData(result.data);
        })
        .catch((error) => {});
    };
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchUsersList();
  }, []);

  const logout = () => {
    socket.emit('logout', token);
    if (socket) {
      // setSocket(null);
      socket.disconnect();
    }
    setToken(null);
    setUser(null);
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

  const toggleMobileVersion = () => {
    setIsMobileVersionVisible(!isMobileVersionVisible);
  };

  const totalCount = useMemo(
    () => userCount?.reduce((totalCount, currentCount) => totalCount + currentCount.count, 0),
    [userCount],
  );

  return (
    <div className={styled.userLetfMenu}>
      <div className={styled.mobileVersion} onClick={toggleMobileVersion}>
        {isMobileVersionVisible ? <img src={MenuClose} alt='' /> : <img src={MenuIcon} alt='' />}
      </div>

      <div
        className={isMobileVersionVisible ? `${styled.desktopVersion}` : `${styled.mobileHidden}`}
      >
        {/* <div className={styled.profileSec}>
          <div className={styled.imgUser}>
            <img src={avatarImage} alt='' />
          </div>
          <div className={styled.contentUuser}>
            <h3>{user?.userName ?? 'USER NAME'}</h3>
            <Link to='/subscription'>
              <p>
                <span>{listData}</span>
              </p>
              <img src={UserCoin} alt='' />
              <p>
                <span>top up account</span>
              </p>
            </Link>
          </div>
          <div className='clear'></div>
        </div> */}
        <div className={styled.userLeftNav}>
          <ul>
            <li>
              <Link to='/userHome'>
                <img src={UserIconHome} alt='as' /> Home page
              </Link>
            </li>
            <li>
              <Link to='/userAnnoucements'>
                <img src={UserAnnoucementIcon} alt='as' />
                {totalCount > 0 && <span className={styled.countNumber}>{totalCount}</span>}
                Annoucements
              </Link>
            </li>
            <li>
              <Link to='/userFavourites'>
                <img src={UserFavourites} alt='as' />
                Favourites
              </Link>
            </li>
            <li>
              <Link to='/userProfileVisior'>
                <img src={UserProfileVisior} alt='as' />
                Profile Visior
              </Link>
            </li>
            <li>
              <Link to='/subscription' style={{ color: '#ff7048' }}>
                <img src={UserTopUpAccount} alt='as' />
                Top up account
              </Link>
            </li>
            <li>
              <Link to='/subscriptionpurchased'>
                <img src={subscription} alt='as' />
                Subscriptions
              </Link>
            </li>
            <li>
              <img src={Logout} alt='logout' />
              <button onClickCapture={logout}>Logout</button>
            </li>
          </ul>
          <div className='clear'></div>
        </div>

        <div className={styled.UserleftSuprise}>
          <img className={`${styled.img1dice} ${styled.animate_roll}`} src={Image1Dice} alt='' />
          <img className={`${styled.img2dice} ${styled.animate_roll}`} src={Image2Dice} alt='' />
          <Link to='/random-user'>Suprise me!</Link>
          <p>Dice and let yourself be suprised!</p>
          <div className='clear'></div>
        </div>
        {/* <div className={styled.userCopyright}>
          <ul>
            <li>
              <Link to='/data-protection'>Data protection</Link>
            </li>
            <li>
              <Link to='/term-of-use'>Term of Use</Link>
            </li>
            <li>
              <Link to='/imprint'>Imprint</Link>
            </li>
          </ul>
          <p>Contact &copy; - Zizle - Made with &#10084;</p>
          <div className='clear'></div>
        </div> */}

        <div className={styled.profileSec}>
          <div className={styled.imgUser}>
            {avatarImage === null ? (
              <img src={ProfileImage} alt='' />
            ) : (
              <img src={avatarImage} alt='' />
            )}
          </div>
          <div className={styled.contentUuser}>
            <h3>{user?.userName ?? 'USER NAME'}</h3>
            <Link to='/subscription'>
              <p>
                <span>{listData}</span>
              </p>
              <img src={UserCoin} alt='' />
              <p>
                <span>top up account</span>
              </p>
            </Link>
          </div>
          <div className='clear'></div>
        </div>
      </div>
    </div>
  );
};

const PageWrapper = () => {
  return (
    <div className={styled.mainContainer}>
      <div className={styled.userHeaderSec}>
        <div className='logoSec'>
          <UserHeaderLogo />
        </div>
        <div className='logoSec'>
          <UserHeaderButtons />
        </div>
      </div>
      <div className={styled.UserLeftNavigation}>
        <UserLeftContent />
        <div className={styled.usernaviright}>
          <Outlet />
        </div>
        <div className={styled.clear}></div>
      </div>
      <div className={styled.footer}>
        <Footer />
      </div>
    </div>
  );
};
export default PageWrapper;
