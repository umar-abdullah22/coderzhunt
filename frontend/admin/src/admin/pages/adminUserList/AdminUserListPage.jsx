import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import AdminUserList from '../../components/admin/adminBody/adminUserList/AdminUserList';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const AdminUserListPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <AdminUserList />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default AdminUserListPage;
