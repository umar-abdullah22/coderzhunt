import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import styled from './style.module.css';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/fontawesome-free-solid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  subscriptionsUserListAction, subscriptionEditAccessAction,subsDeleteAccessAction
} from '../../../../../store/slices/userAuth/actions';

const mainHeading = {
  marginBottom: '20px',
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AdminSubscription = () => {
  const [open, setOpen] = React.useState(false);
  const [listData, setListData] = useState('');

  const handleOpen = (id, packageType, coins, amount, topselling) => {
    setId(id);
    setPackageType(packageType);
    setNoOfCoins(coins)
    setAmount(amount)
    setBestSelling(topselling)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const [id, setId] = useState('');
  const [packageType, setPackageType] = useState('');
  const [noOfCoins, setNoOfCoins] = useState('');
  const [amount, setAmount] = useState('');
  const [bestSelling, setBestSelling] = useState();
  const toggleChecked = () => setBestSelling((value) => !value);

  const dispatch = useDispatch();

  const subscriptionHandleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id,
      packageType,
      noOfCoins,
      amount,
      bestSelling,
    };
  };

  const onActionEdit = (e) => {
    e.preventDefault();
    const payload = {
      id,
      packageType,
      noOfCoins: parseInt(noOfCoins),
      amount: parseInt(amount),
      bestSelling,
    };
    dispatch(subscriptionEditAccessAction(payload))
      .then(unwrapResult)
      .then((result) => {
        fetchUsersList();
        setOpen(false);
      })
      .catch((error) => { });
  };

  const onActionDelete = (id) => {
    const payload = {
      id: id
    };
    dispatch(subsDeleteAccessAction(payload))
      .then(unwrapResult)
      .then((result) => {
        fetchUsersList();
      })
      .catch((error) => { });
  };

  const fetchUsersList = useCallback(async () => {
    dispatch(subscriptionsUserListAction())
      .then(unwrapResult)
      .then((result) => {
        setListData(result.data);
      })
      .catch((error) => { });
  }, []);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  return (
    <div>
      <Typography variant='h6' sx={mainHeading}>
        Dashboard {'>'} Admin Subscription
      </Typography>
      <table width='100%' className={styled.allSubscription}>
        <tr>
          <th>Package Type</th>
          <th>Best selling</th>
          <th>No of coins</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>


        {listData && (
          <>
            {listData.map((userListData) => (
              <>
                <tr>
                  <td>{userListData.packageName}</td>
                  <td>{userListData.bestSelling ? "Yes" : "No"}</td>
                  <td>{userListData.noOfCoins}</td>
                  <td>{userListData.amount}</td>
                  <td>
                    <Button onClick={() => handleOpen(userListData.id, userListData.packageName, userListData.noOfCoins, userListData.amount, userListData.bestSelling)}>
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      id={userListData.id}
                      aria-labelledby='modal-modal-title'
                      aria-describedby='modal-modal-description'
                    >
                      <Box sx={style}>
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                          Update Form
                        </Typography>
                        <form
                          onSubmit={(e) => {
                            subscriptionHandleSubmit(e);
                          }}
                        >
                          <div className={styled.fromGroup}>
                            <label>Package Name</label>
                            <input type='text' value={packageType} onChange={(e) => setPackageType(e.target.value)} />
                          </div>
                          <div className={styled.fromGroup}>
                            <label>No of coins</label>
                            <input type='text' value={noOfCoins} onChange={(e) => setNoOfCoins(e.target.value)} />
                          </div>
                          <div className={styled.fromGroup}>
                            <label>Amount</label>
                            <input type='text' value={amount} onChange={(e) => setAmount(e.target.value)} />
                          </div>
                          <div className={styled.fromGroup}>

                            <label>Best seller</label>
                            <label className='toggle'>
                              <input
                                className={styled.toggle_checkbox}
                                type='checkbox'
                                checked={bestSelling}
                                onChange={toggleChecked}
                              />
                              <div className={styled.toggle_switch}></div>
                              <span className={styled.toggle_label}></span>
                            </label>
                          </div>
                          <div className={styled.fromGroup}>
                            <button onClick={onActionEdit}>Submit</button>
                          </div>
                        </form>
                      </Box>
                    </Modal>
                    <Button  onClick={() => onActionDelete(userListData.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              </>
            ))}

          </>
        )}



      </table>
    </div>
  );
};
export default AdminSubscription;
