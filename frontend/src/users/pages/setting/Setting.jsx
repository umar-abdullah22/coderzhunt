import React from 'react';
import UserHeaderButtons from '../../components/userHeaderButtons/UserHeaderButtons';
import UserHeaderLogo from '../../components/userHeaderLogo/UserHeaderLogo';
import UserLeftContent from '../../components/userLeftContent/UserLeftContent';
import SettingTabs from '../../components/settingTabs/SettingTabs';
import styled from './style.module.css';

const Setting = () => {
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
        <SettingTabs />
      </div>
    </>
  );
};

export default Setting;
