import React from 'react';
import { AnalyticsContainerLeftBody } from '../analyticsContainerLeftBody/AnalyticsContainerLeftBody';
import { AnalyticsContainerCenterBody } from '../analyticsContainerCenterBody/AnalyticsContainerCenterBody';
import { AnalyticsContainerRightBody } from '../analyticsContainerRightBody/AnalyticsContainerRightBody';
import styled from './style.module.css';

export const ContainerBody = () => {
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
