import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';
import CreateModerator from '../../components/admin/adminBody/createModerator/CreateModerator';

const CreateModeratorPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <CreateModerator />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default CreateModeratorPage;
