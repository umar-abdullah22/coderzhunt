import React, { useEffect, useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import styled from './style.module.css';
import ProfilePic from '../../../../../assets/images/profilepic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/fontawesome-free-solid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  fakeUserListAction, fakeEditAccessAction, fakeDeleteAccessAction
} from '../../../../../store/slices/userAuth/actions';
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

const mainHeading = {
  marginBottom: '10px',
};

const FakeUser = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [relation, setRelation] = useState('');
  const [children, setChildren] = useState('');
  const [life, setLife] = useState('');
  const [smoker, setSmoker] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');


  const handleOpen = (id, name, email, dob, postalcode, relation, children, life, smoker, gender, age) => {
    setId(id)
    setName(name)
    setEmail(email)
    setDob(dob)
    setPostalCode(postalcode)
    setRelation(relation)
    setChildren(children)
    setLife(life)
    setSmoker(smoker)
    setGender(gender)
    setAge(age)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const [listData, setListData] = useState('');
  const dispatch = useDispatch();

  const onActionEdit = (e) => {
    e.preventDefault();
    const payload = {
      id,
      name,
      email,
      dob,
      postalCode,
      relation,
      children,
      life,
      smoker,
      gender,
      age,
    };
    dispatch(fakeEditAccessAction(payload))
      .then(unwrapResult)
      .then((result) => {
        fetchUsersList();
        setOpen(false);
      })
      .catch((error) => {});
  };

  const onActionDelete = (id) => {
    const payload = {
      id: id
    };
    dispatch(fakeDeleteAccessAction(payload))
      .then(unwrapResult)
      .then((result) => {
        fetchUsersList();
      })
      .catch((error) => {});
  };

  const fetchUsersList = useCallback(async () => {
    dispatch(fakeUserListAction())
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
        Dashboard {'>'} Fake User
      </Typography>

      <table width='100%' className={styled.allFakeUser}>
        <tr>
          <th>Avatar</th>
          <th>Username</th>
          <th>Email</th>
          <th>Date of birth</th>
          <th>Postal code</th>
          <th>Relationship Status</th>
          <th>Children</th>
          <th>Life</th>
          <th>Smoker</th>
          <th>Action</th>
        </tr>

        {listData && (
          <>
            {listData.map((userListData) => (
              <>
                <tr>
                  <td>
                    <img src={ProfilePic} alt='' />
                  </td>
                  <td>{userListData.userName}</td>
                  <td>{userListData.email}</td>
                  <td>{userListData.dob}</td>
                  <td>{userListData.postalCode}</td>
                  <td>{userListData.relationshipStatus}</td>
                  <td>{userListData.children}</td>
                  <td>{userListData.life}</td>
                  <td>{userListData.smoker}</td>
                  <td>
                    <Button onClick={() => handleOpen(userListData.id, userListData.userName, userListData.email, userListData.dob, userListData.postalCode, userListData.relationshipStatus, userListData.children, userListData.life, userListData.smoker, userListData.selfGender, userListData.age)}>
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Modal
                      keepMounted
                      open={open}
                      id={userListData.id}
                      onClose={handleClose}
                      aria-labelledby='keep-mounted-modal-title'
                      aria-describedby='keep-mounted-modal-description'
                    >
                      <Box sx={style}>
                        <Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
                          Edit Form
                        </Typography>
                        <div className={styled.createFakeUser}>
                          <form>
                            <div className={`${styled.fromGroup} ${styled.fromGroupFull}`}>
                              <label>Avatar</label>
                              <input type="file" name="file" />
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Username</label>
                              <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="username" />
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Email</label>
                              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Date of Birth</label>
                              <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" name="dob" />
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>PostalCode</label>
                              <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} type="text" name="postalcode" />
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Gender</label>
                              <select value={gender} onChange={(e) => setGender(e.target.value)} >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHERS">Others</option>
                              </select>
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Age</label>
                              <input value={age} onChange={(e) => setAge(e.target.value)} type="text" name="age" />
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Relationship Status</label>
                              <select value={relation} onChange={(e) => setRelation(e.target.value)}>
                                <option value="SINGLE">Single</option>
                                <option value="IN_A_RELATIONSHIP">In a Relationship</option>
                                <option value="MARRIED">Married</option>
                                <option value="WIDOWED">Widowed</option>
                                <option value="DIVORCED">Divorced</option>
                                <option value="OPEN_RELATION">Open Relationship</option>
                                <option value="IT'S_COMPLICATED">It&apos;s complicated</option>
                              </select>
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Children</label>
                              <select value={children} onChange={(e) => setChildren(e.target.value)}>
                                <option value="YES">Yes</option>
                                <option value="NO">No</option>
                              </select>
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Life</label>
                              <select value={life} onChange={(e) => setLife(e.target.value)}>
                                <option value="ALONE">Alone</option>
                                <option value="AT_PARENTS">At parents</option>
                                <option value="FLAT_SHARE">Flat Share</option>
                                <option value="WITH_PARTNER">With partner</option>
                                <option value="MISCELLANEOUS">Miscellaneous</option>
                              </select>
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                              <label>Smoker</label>
                              <select value={smoker} onChange={(e) => setSmoker(e.target.value)}>
                                <option value="YES">Yes</option>
                                <option value="NO">No</option>
                                <option value="STOPPED">Stopped</option>
                                <option value="OCCASIONALLY">Occasionally</option>
                              </select>
                            </div>
                            <div className={`${styled.fromGroup} ${styled.fromGroupFull}`}>
                              <button onClick={onActionEdit}>Submit</button>
                            </div>

                          </form>
                        </div>
                      </Box>
                    </Modal>
                    <Button onClick={() => onActionDelete(userListData.id)}>
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

export default FakeUser;
