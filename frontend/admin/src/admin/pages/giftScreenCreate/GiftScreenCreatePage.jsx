import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';
import GiftScreenCreate from "../../components/admin/adminBody/giftScreenCreate/GiftScreenCreate"

const GiftScreenCreatePage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <GiftScreenCreate />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default GiftScreenCreatePage;
