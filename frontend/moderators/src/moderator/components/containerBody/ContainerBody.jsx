import React, { useEffect, useRef } from 'react';
import AnalyticsContainerLeftBody from '../analyticsContainerLeftBody/AnalyticsContainerLeftBody';
import AnalyticsContainerCenterBody from '../analyticsContainerCenterBody/AnalyticsContainerCenterBody';
import AnalyticsContainerRightBody from '../analyticsContainerRightBody/AnalyticsContainerRightBody';
import { useDispatch } from 'react-redux';
import { modCustomerListAction } from '../../../store/slices/moderatorApi/actions';
import { emptyState } from '../../../store/slices/moderatorApi/moderatorApiSlice';
import { useLocation } from 'react-router-dom';
import styled from './style.module.css';
import { useUser } from '../../../providers/useUser';

export const ContainerBody = () => {
  const dispatch = useDispatch()
  const userChatFetchecRef = useRef(false)
  const location = useLocation()
  const { token } = useUser()

  useEffect(() => {
    if (userChatFetchecRef.current) return;
    userChatFetchecRef.current = true;
    dispatch(modCustomerListAction({
      token
    }))
  }, []);

  useEffect(() => {
    dispatch(emptyState())
  }, [location?.pathname])


  return (
    <div className={styled.containerBody}>
      <div className={styled.containerBodyLeft}>
        <AnalyticsContainerLeftBody />
      </div>
      <div className={styled.containerBodyCenter}>
        <AnalyticsContainerCenterBody />
      </div>
      <div className={styled.containerBodyright}>
        <AnalyticsContainerRightBody />
      </div>
      <div className={styled.clear}></div>
    </div>
  );
};
