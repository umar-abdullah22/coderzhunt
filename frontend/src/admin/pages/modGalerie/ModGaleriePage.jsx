import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import ModGalerie from '../../components/admin/adminBody/modGalerie/ModGalerie';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';

const ModGaleriePage = () => {
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <ModGalerie />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default ModGaleriePage;
