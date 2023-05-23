import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import Werbung from '../../components/admin/adminBody/werbung/Werbung';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const WerbungPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <Werbung />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default WerbungPage;
