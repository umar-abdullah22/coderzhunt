import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import CreateFakeUser from '../../components/admin/adminBody/createFakeUser/CreateFakeUser';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const CreateFakeUserPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <CreateFakeUser/>
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default CreateFakeUserPage;
