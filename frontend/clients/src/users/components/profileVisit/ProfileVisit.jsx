import React, { Fragment, useEffect, useRef, useState } from 'react';
import styled from './style.module.css';
// import UserProfile from "../../assets/images/userP.jpg"
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UserFavourtiesIcon from '../../../assets/images/favourties_icon.svg';
import { profileVisitorList } from './../../../store/slices/customerAPI/action';
import {
  userCoinCostAction,
  userCointransactionAction,
} from '../../../store/slices/userAuth/actions';
import userP from '../../../assets/images/userP.jpg';
import { CircularProgress } from '@mui/material';

import { useUser } from '../../../providers/useUser';
const ProfileVisit = () => {
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const profileVisitorsListFetched = useRef(false);

  const dispatch = useDispatch();
  const { token } = useUser();

  const handleUnlock = (id) => {
    const payload = {
      actionType: 'ViewPhoto',
      receiverId: id,
    };
    setIsLoading(true);
    dispatch(userCointransactionAction(payload))
      .then(unwrapResult)
      .then((result) => {
        if (result.data.success) {
          navigate(`/profile/${id}`);
        } else {
          setShowPopup(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const visitProfileList = () => {
    const payload = {
      token,
    };
    dispatch(profileVisitorList(payload))
      .then(unwrapResult)
      .then((result) => {
        setListData(result);
      })
      .catch((error) => {
      });

    dispatch(userCoinCostAction())
      .then(unwrapResult)
      .then((result) => {
        setCoinData(result);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    if (profileVisitorsListFetched.current) return;
    profileVisitorsListFetched.current = true;
    visitProfileList();
  }, []);


  return (
    <Fragment>
      <div className={styled.ProfileVisitmain}>
        {listData?.length === 0 ? (
          <div className={styled.ProfileVisitMessage}>
            <img src={UserFavourtiesIcon} alt='a' />
            <p>Creepy, there&apos;s nothing here.</p>
          </div>
        ) : (
          listData?.map((user) => (
            <div className={styled.ProfileVisitInner}>
              <div className={styled.lockProfile}>
                <div className={styled.imageMain}>
                  {user?.seen ? (
                    <img src={user?.visitor.imgUrl} alt='' />
                  ) : (
                    <img src={userP} alt='' />
                  )}
                </div>
                <div className={styled.locakProfileContent}>
                  <p>{user?.visitor?.userName}</p>
                  <p>{user?.visitor?.email}</p>
                  <p>{coinData.length > 0 && coinData?.data[6]?.cost} coins</p>
                  {user?.seen ? (
                    <button
                      onClick={() => navigate(`/profile/${user?.visitor?.id}`)}
                      className={styled.unlockbtn}
                    >
                      Visit
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnlock(user?.visitor?.id)}
                      className={styled.unlockbtn}
                    >
                      {isLoading ? <CircularProgress color='secondary' size={20} /> : `UNLOCK`}
                    </button>
                  )}
                </div>

                {showPopup && (
                  <Popup open position='right center'>
                    <div className={styled.popup}>Not Enough Coins</div>
                  </Popup>
                )}
              </div>
            </div>
          ))
        )}
        <div className={styled.clear}></div>
      </div>
    </Fragment>
  );
};

export default ProfileVisit;
