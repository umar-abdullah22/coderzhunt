import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import BonusCodes from '../../components/admin/adminBody/bonusCodes/BonusCodes';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';
import CoinManagementCreated from '../../components/admin/adminBody/coinManagementCreated/CoinManagementCreated';

const CoinManagementCreatedPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <CoinManagementCreated />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default CoinManagementCreatedPage;
