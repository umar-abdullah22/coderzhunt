import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import AccountTypen from '../../components/admin/adminBody/adminDashboard/AdminDashboard';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <AccountTypen />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
