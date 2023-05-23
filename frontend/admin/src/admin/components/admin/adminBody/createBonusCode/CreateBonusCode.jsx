import React, { useState,useCallback } from 'react';
import styled from './style.module.css';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {createBonusCodeAction} from '../../../../../store/slices/userAuth/actions'
const mainHeading = {
  marginBottom: '10px',
};

const CreateBonusCode = () => {
  const [bonusCode, setBonusCode] = useState();
  const [bonusCoin, setBonusCoin] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const dispatch = useDispatch();
 

  const bonusCodeHandler = (e) => {
    e.preventDefault();
     const payload = {
    bonusCode: bonusCode,
    bonusCoins: +bonusCoin,
    expiryDate: expiryDate,
  };
     dispatch(createBonusCodeAction(payload))
      .then(unwrapResult)
      .then((result) => {
        // setListData(result.data);
      })
      .catch((error) => { });
  };

  return (
    <div className={styled.bonusCode}>
      <Typography variant='h6' sx={mainHeading}>
        Dashboard {'>'} Create Bonus Code
      </Typography>
      <form >
        <div className={styled.formGroup}>
          <label>Bonus Code</label>
          <input type='text' name='bonus-code' onChange={(e) => setBonusCode(e.target.value)} />
        </div>
        <div className={styled.formGroup}>
          <label>Bonus Coin</label>
          <input type='text' name='bonus-coin' onChange={(e) => setBonusCoin(e.target.value)} />
        </div>
        <div className={styled.formGroup}>
          <label>Expire date</label>
          <input
            type='date'
            name='bonus-expiry-date'
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        <div className={`${styled.fromGroup} ${styled.fromGroupFull}`}>
          <button type='button' onClick={bonusCodeHandler}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBonusCode;
