/* eslint-disable no-undef */
import { unwrapResult } from '@reduxjs/toolkit';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import UserFavourtiesIcon from '../../../assets/images/favourties_icon.svg';
import { blockedUsersListAction } from '../../../store/slices/customerAPI/action.js';
import styled from './style.module.css';
import { useUser } from '../../../providers/useUser';

const SettingTabBlockMembers = () => {
  const [blockedListData, setblockedListData] = useState([]);

  const dispatch = useDispatch();
  const { token } = useUser();

  const blockedProfileList = () => {
    const payload = {
      token,
    };
    dispatch(blockedUsersListAction(payload))
      .then(unwrapResult)
      .then((result) => {
        setblockedListData(result);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    blockedProfileList();
  }, []);

  return (
    <Fragment>
      <div className={styled.ProfileVisitmain}>
        {blockedListData?.length === 0 ? (
          <div className={styled.ProfileVisitMessage}>
            <img src={UserFavourtiesIcon} alt='a' />
            <p>Creepy, there &apos; s nothing here.</p>
          </div>
        ) : (
          blockedListData?.map((listBlockedData) => (
            <div className={styled.ProfileVisitInner}>
              <Link to={`/profile/${listBlockedData?.blocked?.id}`}>
                <div className={styled.lockProfile}>
                  <p>{listBlockedData?.blocked?.userName}</p>
                </div>
              </Link>
            </div>
          ))
        )}
        <div className={styled.clear}></div>
      </div>
    </Fragment>
  );
};
export default SettingTabBlockMembers;
