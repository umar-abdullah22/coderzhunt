import React, { useEffect, useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/fontawesome-free-solid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  getrGiftAction,
  updaterGiftAction,
  deleteGiftAction,
} from '../../../../../store/slices/userAuth/actions';
import styled from './style.module.css';

const mainHeading = {
  marginBottom: '10px',
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const GiftScreen = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [cost, setCost] = useState('');
  const [actionType, setActionType] = useState('');
  const [listData, setListData] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = (id, url, cost, action) => {
    setId(id);
    setUrl(url);
    setCost(cost);
    setActionType(action);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const onActionEdit = (e) => {
    e.preventDefault();
    const payload = {
      id,
      imageUrl: selectedFile,
      cost,
      actionType,
    };
    dispatch(updaterGiftAction(payload))
      .then(unwrapResult)
      .then((result) => {
        fetchUsersList();
        setOpen(false);
      })
      .catch((error) => {
      });
  };

  const onActionDelete = (id) => {
    const payload = {
      id: id,
    };
    dispatch(deleteGiftAction(payload))
      .then(unwrapResult)
      .then((result) => {
        fetchUsersList();
      })
      .catch((error) => {
      });
  };

  const fetchUsersList = useCallback(async () => {
    dispatch(getrGiftAction())
      .then(unwrapResult)
      .then((result) => {
        setListData(result.data);
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  return (
    <div>
      <Typography variant='h6' sx={mainHeading}>
        Dashboard {'>'} Gifts
      </Typography>

      <table width='100%' className={styled.allFakeUser}>
        <tr>
          <th>Avatar</th>
          <th>No. of Coins</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
        {listData && (
          <>
            {listData?.map((gifts) => (
              <>
                <tr>
                  <td>
                    {/* <div style={{backgroundImage: `url(${userListData.avatarUrl})`, width: "100px", height: "100px"}}></div> */}
                    <img src={`${gifts?.imageUrl}`} alt='No image' />
                  </td>
                  <td>{gifts?.cost}</td>
                  <td>{gifts?.actionType}</td>
                  <td>
                    <Button
                      onClick={() =>
                        handleOpen(
                          gifts?.id,
                          gifts?.imageUrl,
                          gifts?.cost,
                          gifts?.actionType
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Modal
                      keepMounted
                      open={open}
                      id={gifts?.id}
                      onClose={handleClose}
                      aria-labelledby='keep-mounted-modal-title'
                      aria-describedby='keep-mounted-modal-description'
                    >
                      <Box sx={style}>
                        <Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
                          Edit Form
                        </Typography>
                        <div className={styled.createFakeUser}>
                          <form onSubmit={onActionEdit} enctype="multipart/form-data">
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <div className={styled.formGroup}>
                                <label htmlFor='fileInput'>Select a file:</label>
                                <input
                                  type='file'
                                  accept='images/*'
                                  id='fileInput'
                                 onChange={(event) => setSelectedFile(event.target.files[0])}
                                />
                              </div>
                            </div>

                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Cost</label>
                              <input
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                type='number'
                                name='Cost'
                              />
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Title</label>
                              <input
                                value={actionType}
                                onChange={(e) => setActionType(e.target.value)}
                                type='text'
                                name='Title'
                              />
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupFull}`}>
                              <button onClick={onActionEdit}>Submit</button>
                            </div>
                          </form>
                        </div>
                      </Box>
                    </Modal>
                    <Button onClick={() => onActionDelete(gifts.id)}>
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

export default GiftScreen;
