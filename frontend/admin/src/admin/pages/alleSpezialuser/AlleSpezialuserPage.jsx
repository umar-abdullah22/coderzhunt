import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import AlleSpezialuser from '../../components/admin/adminBody/alleSpezialuser/AlleSpezialuser';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const AlleSpezialuserPage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <AlleSpezialuser />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default AlleSpezialuserPage;
