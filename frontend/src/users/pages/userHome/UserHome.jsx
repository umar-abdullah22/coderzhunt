import React from 'react';
import { useLocation } from 'react-router-dom';
import UserHeaderButtons from '../../components/userHeaderButtons/UserHeaderButtons';
import UserHeaderLogo from '../../components/userHeaderLogo/UserHeaderLogo';
import UserLeftContent from '../../components/userLeftContent/UserLeftContent';
// import SettingTabs from "../../components/settingTabs/SettingTabs";
import UserHomeTabs from '../../components/userHomeTabs/UserHomeTabs';
import styled from './style.module.css';
import UserPopupVerification from '../../components/userPopupVerification/UserPopupVerification';
// import UserPopupVerification from "../../components/userPopupVerification/UserPopupVerification";
//
const UserHome = () => {
  const { state } = useLocation();
  return (
    <>
      {state?.email ? (
        <UserPopupVerification email={state.email} />
      ) : (
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
            <UserHomeTabs />
          </div>
        </>
      )}
    </>
  );
};

export default UserHome;
