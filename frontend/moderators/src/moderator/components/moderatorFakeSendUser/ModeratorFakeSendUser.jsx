import React, { useState } from 'react';
import AnalyticsContainerLeftBody from '../analyticsContainerLeftBody/AnalyticsContainerLeftBody';
import AnalyticsContainerRightBody from '../analyticsContainerRightBody/AnalyticsContainerRightBody';
import styled from './style.module.css';
import ModeratorFakeMiddleSection from '../moderatorFakeMiddleSection/ModeratorFakeMiddleSection';

const ModeratorFakeSendUser = () => {
  const [selectedFakeUserIds, setSelectedFakeUserIds] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  
  return (
    <div className={styled.containerBody}>
      <div className={styled.containerBodyLeft}>
        <AnalyticsContainerLeftBody selectedFakeUserIds={selectedFakeUserIds} setSelectedFakeUserIds={setSelectedFakeUserIds} />
      </div>
      <div className={styled.containerBodyCenter}>
        <ModeratorFakeMiddleSection selectedFakeUserIds={selectedFakeUserIds} selectedCustomerIds={selectedCustomerIds} />
      </div>
      <div className={styled.containerBodyright}>
        <AnalyticsContainerRightBody selectedCustomerIds={selectedCustomerIds} setSelectedCustomerIds={setSelectedCustomerIds} />
      </div>
      <div className={styled.clear}></div>
    </div>
  );
};
export default ModeratorFakeSendUser;