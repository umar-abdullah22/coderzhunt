import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from './style.module.css';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  subscriptionsUserListAction
} from '../../../../src/store/slices/userAuth/actions';
const SubscriptionComponents = () => {
  const [listData, setListData] = useState('');


  const dispatch = useDispatch();
  const fetchUsersList = useCallback(async () => {
    dispatch(subscriptionsUserListAction())
      .then(unwrapResult)
      .then((result) => {
        setListData(result.data);
      })
      .catch((error) => { });
  }, []);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);




  return (
    <div>
      <div className={styled.subscriptionUi}>
        <h3 className={styled.headingSubscrpt}>top up account</h3>
        <h3 className={styled.headingSubscrpt}>Other packages</h3>
        {listData && (
          <>
            {listData.map((userListData) => (
              <>
                <div className={styled.packagesList}>
                  <div className={styled.packages}>
                    <div className={styled.packageTitle}>
                      <h2>{userListData.packageName}</h2>
                      <p>
                        € {userListData.amount}, <span>99</span>
                      </p>
                    </div>
                    <h3>{userListData.noOfCoins}</h3>
                    <Link to="#">Choose</Link>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
        <h3 className={styled.headingSubscrpt}>Paysafecard packages</h3>
        {listData && (
          <>
            {listData.map((userListData) => {
              return userListData.bestSelling ? (
                <>
                  <div className={styled.packagesList}>
                    <div className={styled.packages}>
                      <div className={styled.packageTitle}>
                        <h2>{userListData.packageName}</h2>
                        <p>
                          € {userListData.amount}, <span>99</span>
                        </p>
                      </div>
                      <h3>{userListData.noOfCoins}</h3>
                      <Link to="#">Choose</Link>
                    </div>
                  </div>
                </>
              ) : '';
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionComponents;
