import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';
import CreateBonusCode from '../../components/admin/adminBody/createBonusCode/CreateBonusCode';

const CreateBonusCodePage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <CreateBonusCode />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default CreateBonusCodePage;
