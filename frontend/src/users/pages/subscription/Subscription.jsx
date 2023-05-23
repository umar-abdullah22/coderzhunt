import React from 'react';
import SubscriptionComponents from '../../components/subscriptionComponent/SubscriptionComponents';
import UserHeaderButtons from '../../components/userHeaderButtons/UserHeaderButtons';
import UserHeaderLogo from '../../components/userHeaderLogo/UserHeaderLogo';
import UserLeftContent from '../../components/userLeftContent/UserLeftContent';
import styled from './style.module.css';

const Subscription = () => {
  return (
    <>
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
        <SubscriptionComponents/>
      </div>
    </>
  );
};

export default Subscription;
