import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import CreateFakeUser from '../../components/admin/adminBody/createFakeUser/CreateFakeUser';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';
import Moderator from '../../components/admin/adminBody/moderator/Moderator';

const ModeratorPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <Moderator />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default ModeratorPage;
