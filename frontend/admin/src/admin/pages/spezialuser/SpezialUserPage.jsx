import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import SpezialUser from '../../components/admin/adminBody/spezialuser/SpezialUser';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const SpezialUserPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <SpezialUser />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default SpezialUserPage;
