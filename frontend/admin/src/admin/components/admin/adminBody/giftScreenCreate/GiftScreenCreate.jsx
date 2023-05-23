import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import styled from './style.module.css';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  resigterGiftAction
} from '../../../../../store/slices/userAuth/actions';
const mainHeading = {
  marginBottom: '10px',
};

const GiftScreenCreate = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [noOfCoins, setNoOfCoins] = useState(null);
  const [title, setTitle] = useState(null);
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);

  const giftSubmitHandle = (e) => {
    // var encoded = btoa(JSON.stringify(selectedFile))
    const payload = {
      actionType: title,
      cost: parseInt(noOfCoins),
      imageUrl: selectedFile,
    }

    dispatch(resigterGiftAction(payload))
      .then(unwrapResult)
      .then((result) => {
        setListData(result)

      })
      .catch((error) => {
      });


  }

  return (
    <div>
      <Typography variant='h6' sx={mainHeading}>
        Dashboard {'>'} Create Gifts
      </Typography>

      <div className={styled.formCreateCoin}>
        <form onSubmit={giftSubmitHandle} enctype="multipart/form-data">
          <div className={styled.formGroup}>
            <label htmlFor="fileInput">Select a file:</label>
            <input type='file' accept="images/*" id="fileInput" onChange={(event) => setSelectedFile(event.target.files[0])} />
          </div>
          <div className={styled.formGroup}>
            <label>Cost</label>
            <input type='text' onChange={(event) => setNoOfCoins(`-` + event.target.value)} />
          </div>
          <div className={styled.formGroup}>
            <label>Title</label>
            <input type='text' onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className={styled.formGroup}>
            <Button variant='contained' onClick={giftSubmitHandle}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiftScreenCreate;
