import React from 'react';
import UserVerified from '../../../assets/images/userVerified.svg';
import UserProfile from '../../../assets/images/userP.jpg';
import styled from './style.module.css';

const HomeUserOnline = () => {
  return (
    <div>
      <div className={styled.homeUserNewMain}>
        <div className={styled.homeUserNewInner}>
          <div className={styled.userImage}>
            <img src={UserProfile} alt='' />
          </div>
          <div className={styled.homeUserNewDetails}>
            <h3>
              Countess <span>49</span>
            </h3>
            <p>91XXX</p>
          </div>
          <div className={styled.homeUserNewVerified}>
            <img src={UserVerified} alt='' />
          </div>
          <div className={styled.homeUserNewOnline}>
            <div className={styled.homeUserNewOnlineIcon}></div>
          </div>
        </div>

        <div className={styled.homeUserNewInner}>
          <div className={styled.userImage}>
            <img src={UserProfile} alt='' />
          </div>
          <div className={styled.homeUserNewDetails}>
            <h3>
              Countess <span>49</span>
            </h3>
            <p>91XXX</p>
          </div>
          <div className={styled.homeUserNewVerified}>
            <img src={UserVerified} alt='' />
          </div>
          <div className={styled.homeUserNewOnline}>
            <div className={styled.homeUserNewOnlineIcon}></div>
          </div>
        </div>

        <div className={styled.homeUserNewInner}>
          <div className={styled.userImage}>
            <img src={UserProfile} alt='' />
          </div>
          <div className={styled.homeUserNewDetails}>
            <h3>
              Countess <span>49</span>
            </h3>
            <p>91XXX</p>
          </div>
          {/* <div className={styled.homeUserNewVerified}>
                    <img src={UserVerified} alt="" />
                </div> */}
          <div className={styled.homeUserNewOnline}>
            <div className={styled.homeUserNewOnlineIcon}></div>
          </div>
        </div>

        <div className={styled.homeUserNewInner}>
          <div className={styled.userImage}>
            <img src={UserProfile} alt='' />
          </div>
          <div className={styled.homeUserNewDetails}>
            <h3>
              Countess <span>49</span>
            </h3>
            <p>91XXX</p>
          </div>
          <div className={styled.homeUserNewVerified}>
            <img src={UserVerified} alt='' />
          </div>
          <div className={styled.homeUserNewOnline}>
            <div className={styled.homeUserNewOnlineIcon}></div>
          </div>
        </div>

        <div className={styled.homeUserNewInner}>
          <div className={styled.userImage}>
            <img src={UserProfile} alt='' />
          </div>
          <div className={styled.homeUserNewDetails}>
            <h3>
              Countess <span>49</span>
            </h3>
            <p>91XXX</p>
          </div>
          {/* <div className={styled.homeUserNewVerified}>
                    <img src={UserVerified} alt="" />
                </div> */}
          <div className={styled.homeUserNewOnline}>
            <div className={styled.homeUserNewOnlineIcon}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUserOnline;
