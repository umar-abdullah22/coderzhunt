import React from 'react';
import UserHeaderButtons from '../../components/userHeaderButtons/UserHeaderButtons';
import UserHeaderLogo from '../../components/userHeaderLogo/UserHeaderLogo';
import UserLeftContent from '../../components/userLeftContent/UserLeftContent';
import styled from './style.module.css';
import ProfileImage from '../../../assets/images/profilepic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faGift, faPaperPlane } from '@fortawesome/fontawesome-free-solid';
import Button from '@mui/material/Button';
import SmileIcon from '@mui/icons-material/EmojiEmotions';
import HeartIcon from '@mui/icons-material/Favorite';

const HomeUserInner = () => {
  return (
    <div>
      <div className={styled.userHeaderSec}>
        <div className='logoSec'>
          <UserHeaderLogo />
        </div>
        <div className='logoSec'>
          <UserHeaderButtons />
        </div>
      </div>
     <div className={styled.mainInner}>
     <div className={styled.UserLeftNavigation}>
        <UserLeftContent />
      </div>
      <div className={styled.innerUserDetails}>
          <div className={styled.innerUserDetails1}>
            <div className={styled.innerUserDetailsLeft}>
              <img src={ProfileImage} alt='' />
            </div>
            <div className={styled.innerUserDetailsRight}>
              <div className={styled.giftStatus}>
                <div className={styled.statusShow}>
                  <span>Offline</span>
                </div>
                <div className={styled.giftBan}>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faGift} />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faBan} />
                    </li>
                  </ul>
                  <div className={styled.clear}></div>
                </div>
                <h2>KevinDelong222</h2>
                <h4>RHEINLAND-PFALZ, DE</h4>
              </div>
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
                    >
                      Smile
                    </Button>
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
                    >
                      I like
                    </Button>
                  </li>
                </ul>
              </div>
              <div className={styled.textMessages}>
                <form>
                  <textarea placeholder='' />
                  <button>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              </div>
              
            </div>
            <div className={styled.clear}></div>
            <div className={styled.personalDetails}>
                <ul>
                  <li>
                    <h5>Gender</h5>
                    <p>Male</p>
                  </li>
                  <li>
                    <h5>Age</h5>
                    <p>18</p>
                  </li>
                  <li>
                    <h5>Relationship Status</h5>
                    <p>-</p>
                  </li>
                  <li>
                    <h5>Children</h5>
                    <p>-</p>
                  </li>
                  <li>
                    <h5>Life</h5>
                    <p>-</p>
                  </li>
                  <li>
                    <h5>Smoker</h5>
                    <p>-</p>
                  </li>
                </ul>
              </div>
          </div>
          <div className={`${styled.innerUserDetails1} ${styled.innerUserBottom}`}>
            <h3>Photo ( 0 )</h3>
            <ul>
              <li>
                <img src={ProfileImage} alt='' />
              </li>
              <li>
                <img src={ProfileImage} alt='' />
              </li>
              <li>
                <img src={ProfileImage} alt='' />
              </li>
              <li>
                <img src={ProfileImage} alt='' />
              </li>
              <li>
                <img src={ProfileImage} alt='' />
              </li>
              <li>
                <img src={ProfileImage} alt='' />
              </li>
            </ul>
          </div>
        </div>
        <div className={styled.clear}></div>
      </div> 
    </div>
  );
};

export default HomeUserInner;
