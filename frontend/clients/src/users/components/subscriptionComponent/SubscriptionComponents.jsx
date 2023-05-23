import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from './style.module.css';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { subscriptionsUserListAction } from '../../../../src/store/slices/userAuth/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid';

const SubscriptionComponents = () => {
  const [listData, setListData] = useState('');
  const subscriptionsListFetched = useRef(false);

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
    if (subscriptionsListFetched.current) return;
    subscriptionsListFetched.current = true;
    fetchUsersList();
  }, []);

  return (
    <div>
      <div className={styled.subscriptionUi}>
        <h3 className={styled.headingSubscrpt}>top up account</h3>
        <div className={styled.mainSubscriber}>
          <div className={styled.mainSubscriber1}>
            <div className={styled.mainSec}>
              <Link to='#'>
                <div className={styled.trailpkge}>
                  <h3>Trail packege</h3>
                  <p>
                    only <span>for</span> € 19.99
                  </p>
                  <p>you can only buy the pack once</p>
                </div>
                <div className={styled.trailpkgecoins}>
                  <div className={styled.mainInnerSec}>
                    <div className={styled.sec1}>132</div>
                    <div className={styled.sec1}>coins</div>
                  </div>
                  <h3>No subscription</h3>
                  <h3>No hidden costs</h3>
                  <a href='#'>Choose</a>
                </div>
                <div className={styled.addpackagesCustom}>
                  <ul>
                    <li>+</li>
                    <li>+</li>
                    <li>+</li>
                  </ul>
                </div>
                <div className={styled.clear}></div>
              </Link>
            </div>
          </div>
          <div className={styled.mainSubscriber2}>
            <h3>Bonus code</h3>
            <p>If you have a bonus code you can enter it.</p>
            <form>
              <input type='text' placeholder='code here' />
              <button>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
          <div className={styled.clear}></div>
        </div>

        <h3 className={styled.headingSubscrpt}>Other packages</h3>
        {listData && (
          <>
            {listData.map((userListData) => (
              <div className={styled.packagesListres}>
                <div className={styled.packagesList}>
                  <div className={styled.packages}>
                    <div className={styled.packageTitle}>
                      <h2>{userListData.packageName}</h2>
                      <p>
                        € {userListData.amount}
                      </p>
                    </div>
                    <h3>{userListData.noOfCoins}</h3>
                    <Link
                      to={`/payment-method-screen/?${new URLSearchParams({
                        id: userListData.id,
                        packageName: userListData.packageName,
                        noOfCoins: userListData.noOfCoins,
                        amount: userListData.amount,
                      }).toString()}`}
                    >
                      Choose
                    </Link>
                  </div>
                </div>
              </div>
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
                          € {userListData.amount}
                        </p>
                      </div>
                      <h3>{userListData.noOfCoins}</h3>
                      <Link to='#'>Choose</Link>
                    </div>
                  </div>
                </>
              ) : (
                ''
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionComponents;
