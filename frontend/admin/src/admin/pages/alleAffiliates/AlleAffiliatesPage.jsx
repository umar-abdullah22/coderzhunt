import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import AlleAffiliates from '../../components/admin/adminBody/alleAffiliates/AlleAffiliates';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const AlleAffiliatesPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <AlleAffiliates />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default AlleAffiliatesPage;
