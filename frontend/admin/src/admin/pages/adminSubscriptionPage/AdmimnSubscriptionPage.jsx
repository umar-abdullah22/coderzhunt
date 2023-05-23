import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';
import AdmimnSubscription from "../../components/admin/adminBody/adminSubscription/AdminSubscription"


const AdmimnSubscriptionPage = () => {
  return (
    <div className={styled.mainDiv}>
        <AdminPanelHeader />
        <div className={styled.adminPanelMain}>
          <div className={styled.leftpart}>
            <AdminLeft />
          </div>
          <div className={styled.rightpart}>
            <AdmimnSubscription />
          </div>
          <div className={styled.clear}></div>
        </div>
    </div>
  );
};

export default AdmimnSubscriptionPage;