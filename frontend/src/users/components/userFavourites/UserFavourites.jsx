import React, { Fragment } from 'react';
import styled from './style.module.css';
import UserFavourtiesIcon from '../../../assets/images/favourties_icon.svg';

const UserFavourites = () => {
  return (
    <Fragment>
      <div className={styled.userFrav}>
        <div className={styled.userFavrInner}>
          <img src={UserFavourtiesIcon} alt='a' />
          <p>Creepy, there&apos;s nothing here.</p>
        </div>
      </div>
    </Fragment>
  );
};

export default UserFavourites;
