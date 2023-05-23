import React from 'react';
import styled from '../aDatingStyle/style.module.css';
import AdminCreateSubscription from '../../components/admin/adminBody/adminCreateSubscription/AdminCreateSubscription';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';



const AdminCreateSubscriptionPage = () => {
  return (
    <div className={styled.mainDiv}>
        <AdminPanelHeader />
        <div className={styled.adminPanelMain}>
          <div className={styled.leftpart}>
            <AdminLeft />
          </div>
          <div className={styled.rightpart}>
            <AdminCreateSubscription />
          </div>
          <div className={styled.clear}></div>
        </div>
    </div>
  );
};

export default AdminCreateSubscriptionPage;
