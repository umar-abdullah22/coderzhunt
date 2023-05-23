import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import Fakeusers from '../../components/admin/adminBody/fakeUsers/Fakeusers';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const FakeusersPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <Fakeusers />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default FakeusersPage;
