/* eslint-disable no-undef */
import React, { useState } from 'react';
// import ProfileGeneralDetails from '../profileGeneralDetails/ProfileGeneralDetails';
// import ProfilePersonalDetails from '../profilePersonalDetails/ProfilePersonalDetails';
// import ProfileText from '../profileText/ProfileText';
import styled from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { } from '@fortawesome/fontawesome-free-solid';
import { faCheck, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/fontawesome-free-solid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ProfileTab = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // document.querySelector(document).ready(function () {
  //   var readURL = function (input) {
  //     if (input.files && input.files[0]) {
  //       var reader = new FileReader();

  //       reader.onload = function (e) {
  //         document.querySelector(".profile-pic").attr("src", e.target.result);
  //       };

  //       reader.readAsDataURL(input.files[0]);
  //     }
  //   };

  //   document.querySelector(".file-upload").addEventListener("change", function () {
  //     readURL(this);
  //   });

  //   document.querySelector(".upload-button").addEventListener("click", function () {
  //     document.querySelector(".file-upload").click();
  //   });
  // });

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const multiplehHandleFileChange = (e) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setFiles((prevFiles) => [...prevFiles, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleMultiUploadClick = (e) => {
    e.preventDefault();
    document.querySelector('.multiple_upload').click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    document.querySelector('.file-upload').click();
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styled.profileRight}>
      <form
        onSubmit={(e) => {
          loginSubmitHandler(e);
        }}
      >
        <div className={styled.profileRightl}>
          <h3>profiles</h3>
          <p>This information will be displayed publicly, so be careful what you share.</p>
          <div className={styled.profileDetailsRight}>
            <ol>
              <li>
                <div className={styled.doneSection}>
                  <FontAwesomeIcon size='1x' color='white' icon={faCheck} />
                </div>

                <h4>Confirm your email</h4>
                <p>+ 16 coins</p>
              </li>
              <li>
                <div className={styled.pendingSection}>
                  <FontAwesomeIcon size='1x' color='white' icon={faUpload} />
                </div>

                <h4>Avatar upload</h4>
                <p>+ 3 coins</p>
              </li>
              <li>
                <div className={styled.pendingSection}>
                  <FontAwesomeIcon size='1x' color='white' icon={faUser} />
                </div>
                <h4>Your profile is verified </h4>
                <p>+ 5 coins</p>
                <Button variant='contained' onClick={handleOpen}>
                  Upload a photo
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                      Upload a photo
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                      <input type='file' />
                    </Typography>
                  </Box>
                </Modal>
              </li>
              <li>
                <div className={styled.pendingSection}>
                  <FontAwesomeIcon size='1x' color='white' icon={faPhone} />
                </div>
                <h4>Add mobile number</h4>
                <p>+ 2 coins</p>
              </li>
            </ol>
          </div>
        </div>
        <div className={styled.profileRightr}>
          <div className={styled.profileRightfields}>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='username'>User name</label>
                <input name='username' id='username' type='text' />
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='username'>Email address</label>
                <input type='email' name='email' id='email' />
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='dob'>Date of birth</label>
                <input type='date' id='dob' name='dob' />
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='postal-code'>Postal code</label>
                <input type='text' id='postal-code' name='postal-code' />
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='gender'>Gender</label>
                <select id='gender' name='gender'>
                  <option></option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='phone'>Phone</label>
                <input type='tel' id='phone' name='phone' />
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupFull}`}>
                <label htmlFor='profile-text'>Profile text</label>
                <textarea name='profile-text' id='profile-text' cols='33' rows='5'></textarea>
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupFull}`}>
                <label htmlFor='profile-text'>Avatar</label>
                <input
                  type='file'
                  className='file-upload'
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <img
                  src={
                    file
                      ? file
                      : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                  }
                  alt='Profile Picture'
                  className={styled.profile_pic}
                />

                <button className={styled.upload_button} onClick={handleUploadClick}>
                  Upload
                </button>
              </div>
            </div>

            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupFull}`}>
                <label htmlFor='profile-text'>Photos</label>
                <input
                  type='file'
                  className='multiple_upload'
                  onChange={multiplehHandleFileChange}
                  style={{ display: 'none' }}
                  multiple
                />

                {files.length > 0 ? (
                  files.map((file, index) => (
                    <div className={styled.multiImages} key={index}>
                      <img
                        key={index}
                        src={file}
                        alt={`Profile Picture ${index + 1}`}
                        className={styled.multipleProfile}
                      />
                    </div>
                  ))
                ) : (
                  <div className={styled.multiProfilenone}>
                    <img
                      src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                      alt='Profile Picture'
                      className={styled.multipleProfile}
                    />
                  </div>
                )}
                <button className={styled.multipleUploadButton} onClick={handleMultiUploadClick}>
                  Upload
                </button>
              </div>
            </div>

            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='gender'>Relationship status</label>
                <select id='gender' name='gender'>
                  <option></option>
                  <option>Single</option>
                  <option>In a Relationship</option>
                  <option>Married</option>
                  <option>Widowed</option>
                  <option>Divorced</option>
                  <option>Open Relationship</option>
                  <option>It&apos;s complicated</option>
                </select>
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='children'>Children</label>
                <select id='children' name='children'>
                  <option></option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='life'>Life</label>
                <select id='life' name='life'>
                  <option></option>
                  <option>Alone</option>
                  <option>At parents</option>
                  <option>Flat Share</option>
                  <option>With partner</option>
                  <option>Miscellaneous</option>
                </select>
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='smoker'>Smoker</label>
                <select id='smoker' name='smoker'>
                  <option></option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Stoped</option>
                  <option>Occasionally</option>
                </select>
              </div>
            </div>

            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <h4>Changed password</h4>

                <label htmlFor='pwd'>Password</label>
                <input type='password' name='pwd' id='pwd' />
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <h4 style={{ visibility: 'hidden' }}>Changed password</h4>
                <label htmlFor='newpwd'>New Passowrd</label>
                <input type='password' name='newpwd' id='newpwd' />
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupFull} ${styled.fromGroupcheckbox}`}>
                <input type='checkbox' id='notification' name='notification' />
                <label htmlFor='notification'>
                  <h4>Notifications</h4>
                  <p>Your email subscription status</p>
                </label>
              </div>
            </div>

            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupFull} ${styled.fromGroupradio}`}>
                <label htmlFor='notification'>
                  <h4>Gender interests me</h4>
                  <p>affects standard filters.</p>
                </label>
                <input type='radio' id='male' name='gender' value='male' style={{ display: 'inline-block' }} />
                <label htmlFor='male' style={{ display: 'inline-block', width: 'auto' }}>Male</label><br />
                <input type='radio' id='female' name='gender' value='female' style={{ display: 'inline-block' }} />
                <label htmlFor='female' style={{ display: 'inline-block', width: 'auto' }}>Female</label><br />
              </div>
            </div>
          </div>
          <button className={styled.profileRightButton}>Save</button>
        </div>
        <div className={styled.clear}></div>
      </form>
      {/* <ProfileText />
      <ProfileGeneralDetails />
      <ProfilePersonalDetails /> */}
    </div>
  );
};

export default ProfileTab;
