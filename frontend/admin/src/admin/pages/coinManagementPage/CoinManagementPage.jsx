import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import BonusCodes from '../../components/admin/adminBody/bonusCodes/BonusCodes';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';
import CoinManagement from '../../components/admin/adminBody/coinManagement/CoinManagement';

const CoinManagementPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <CoinManagement />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default CoinManagementPage;
