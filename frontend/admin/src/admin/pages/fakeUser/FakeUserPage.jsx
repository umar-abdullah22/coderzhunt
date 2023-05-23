import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import FakeUser from '../../components/admin/adminBody/fakeUser/FakeUser';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const FakeUserPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <FakeUser />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default FakeUserPage;
