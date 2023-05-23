import { unwrapResult } from '@reduxjs/toolkit';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UserFavourtiesIcon from '../../../assets/images/favourties_icon.svg';
import { favouriteUsersList } from '../../../store/slices/customerAPI/action';
import {
  userCoinCostAction,
  userCointransactionAction,
} from '../../../store/slices/userAuth/actions';
import styled from './style.module.css';
import { useUser } from '../../../providers/useUser';
const UserFavourites = () => {
  let navigate = useNavigate();

  const [listData, setListData] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [listFavUser, setListFavUser] = useState();
  const favouritesListFetched = useRef(false);

  const dispatch = useDispatch();
  const { token } = useUser();


  const handleUnlock = (id) => {
    const payload = {
      actionType: 'VIEWPHOTO',
    };
    dispatch(userCointransactionAction(payload))
      .then(unwrapResult)
      .then((result) => {
        if (result.data.success) {
          navigate(`/profile/${id}`);
        } else {
          setShowPopup(true);
        }
      })
      .catch((error) => {
      });
  };
  const favProfileList = () => {
    const payload = {
      token,
    };
    dispatch(favouriteUsersList(payload))
      .then(unwrapResult)
      .then((result) => {
        setListData(result);
        for (let i = 0; i < result.data.length; i++) {
          const favUser = result.data[i];
          setListFavUser(favUser);
        }
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
    if (favouritesListFetched.current) return;
    favouritesListFetched.current = true;
    favProfileList();
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
          listData?.map((listVisitedData) => (
            <>
              <Link to={`/profile/${listVisitedData?.favorites?.id}`}>
                <div className={styled.ProfileVisitInner}>
                  <div className={styled.lockProfile}>
                    <p>{listVisitedData?.favorites?.userName}</p>
                    {/* <button
                      // onClick={() => handleUnlock(listVisitedData?.favorites?.id)}
                      // className={styled.unlockbtn}
                    >
                      {/* <h3>UNLOCK</h3> */}
                  {/* </button> */}
                    
                  </div>
                </div>
              </Link>
            </>
          ))
        )}
        <div className={styled.clear}></div>
      </div>
    </Fragment>
  );
};

export default UserFavourites;
