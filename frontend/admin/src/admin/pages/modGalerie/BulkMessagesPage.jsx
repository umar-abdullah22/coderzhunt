import React, { useEffect } from 'react';
import styled from '../aDatingStyle/style.module.css';
import AdminPanelHeader from '../../components/admin/adminHeader/AdminHeader';
import AdminLeft from '../../components/admin/adminLeft/AdminLeft';
import BulkMessages from '../../components/admin/adminBody/bulkMessages/BulkMessages';
import { useDispatch } from 'react-redux';
import { adminCustomerListAction } from './../../../store/slices/adminAPI/actions';
const BulkMessagesPage = () => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const payload = {
    token: token,
  };
  useEffect(() => {
    dispatch(adminCustomerListAction(payload))
  }, []);
  return (
    <div>
      <AdminPanelHeader />
      <div className={styled.adminPanelMain}>
        <div className={styled.leftpart}>
          <AdminLeft />
        </div>
        <div className={styled.rightpart}>
          <BulkMessages />
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default BulkMessagesPage;
