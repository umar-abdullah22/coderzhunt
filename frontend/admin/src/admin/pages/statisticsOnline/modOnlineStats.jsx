import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import OnlineModStats from '../../components/admin/adminBody/statistics/OnlineModStats';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const KampagnenDashboardPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <OnlineModStats />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default KampagnenDashboardPage;
