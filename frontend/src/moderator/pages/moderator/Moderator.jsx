import React from 'react';
import styled from './style.module.css';
import { HeaderLeft } from '../../components/headerLeft/HeaderLeft';
import { HeaderRight } from '../../components/headerRight/HeaderRight';
import { ModeratorContainerBody } from '../../components/moderatorContainerBody/ModeratorContainerBody';

export const Moderator = () => {
  return (
    <>
      <div className={styled.mainHeader}>
        <div className={styled.wrapwidth}>
          <HeaderLeft />
          <HeaderRight />
        </div>
      </div>
      <div>
        <ModeratorContainerBody />
      </div>
    </>
  );
};
