/* eslint-disable no-undef */
import React, { useState } from 'react';
// import ProfileGeneralDetails from '../profileGeneralDetails/ProfileGeneralDetails';
// import ProfilePersonalDetails from '../profilePersonalDetails/ProfilePersonalDetails';
// import ProfileText from '../profileText/ProfileText';
import styled from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { } from '@fortawesome/fontawesome-free-solid';
import { faCheck, faUser, faPhone, faMailBulk, faMailForward, faMailReplyAll } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/fontawesome-free-solid';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { clearUser } from '../../../store/slices/userAuth/userAuthSlice'
import { useDispatch } from 'react-redux';
import { useUser } from '../../../providers/useUser';
const BASE_URL = 'https://coderzhunt-backend-zizle.vercel.app/api/customer';
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
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [photosFiles, setPhotosFiles] = useState([]);
  const [photosPreviews, setPhotosPreviews] = useState([])
  const navigate = useNavigate()
  const { token: accessToken, setUser, setToken, user } = useUser();
  const [isFormModified, setIsFormModified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfileData] = useState({
    userName: user?.userName,
    dob: user?.profile?.dateOfBirth,
    gender: user?.selfGender,
    mobileNumber: user?.profile?.mobileNumber,
    profileText: user?.profile?.profileText,
    relationshipStatus: user?.profile?.relationshipStatus,
    children: user?.profile?.children,
    life: user?.profile?.life,
    smoker: user?.profile?.smoker,
    address: user?.address?.address,
    password: '',
    newPassword: '',
    interestedGender: user?.interestedGender,
    avatar: user?.profile?.avatarUrl,
    profile: user?.profile?.isProfileVerified,
    email: user?.profile?.isEmailVerified,
    photos: user?.photos
  });

  const handleMultiUploadClick = (e) => {
    e.preventDefault();
    document.querySelector('.multiple_upload').click();
  };

  function handleAvatarChange(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };

      setAvatar(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function handleMultipleChange(e) {
    const selectedFiles = Array.from(e.target.files);
    const previews = [];

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === selectedFiles.length) {
          setPhotosPreviews([...photosPreviews, ...previews]);
          setPhotosFiles([...photosFiles, ...selectedFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  function removeSelectedPhoto(indexToRemove) {
    setPhotosPreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
  }
  async function handleDeleteAccount(e, confirmed) {
    e.preventDefault()
    document.body.classList.remove('hiddenScroll');
    if (confirmed) {
      // Make the API call to delete the account
      try {
        const response = await axios.delete(`${BASE_URL}`, {
          headers: {
            token: accessToken
          }
        }
        );
        const updatedUserData = await response.data;
        if (updatedUserData.message === 'Account Deleted') {
          // Log out the user and redirect to the login screen
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null)
          setUser(null)
          dispatch(clearUser());
          navigate('/');
          if (window.history && window.history.pushState) {
            window.history.pushState('', null, './');
            window.onpopstate = function () {
              window.history.pushState('', null, './');
            };
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    setShowModal(false);
  };

  async function removePhoto(id) {
    // setPhotosPreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
    try {
      const response = await axios.delete(`${BASE_URL}/deletePhoto/${id}`, {
        headers: {
          token: accessToken
        }
      }
      );
      const updatedUserData = await response.data;
      if (updatedUserData) {
        if (isFormModified) setIsFormModified(false)
        toast.success(`Photo Deleted Successfully!`, {
          position: toast.POSITION.TOP_RIGHT,
        })
        setUser(updatedUserData);
        setProfileData({
          ...profile,
          photos: updatedUserData?.photos,

        })
      }
      else {
        toast.error(`Couldn't delete photo`, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleUploadClick = (e) => {
    e.preventDefault();
    document.querySelector('.file-upload').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isModified = Object.keys(profile).some(
      (key) => profile[key] !== user[key]
    );
    if (!isFormModified || !isModified) {
      // If the form hasn't been modified, show a message or do nothing
      return;
    }
    else {
      const profileData = {
        userName: profile?.userName,
        dob: profile?.dob,
        selfGender: profile?.gender?.toUpperCase(),
        mobileNumber: profile?.mobileNumber,
        profileText: profile?.profileText,
        relationshipStatus: profile?.relationshipStatus,
        children: profile?.children,
        life: profile?.life,
        smoker: profile?.smoker,
        currentPassword: profile?.password,
        newPassword: profile?.newPassword,
        interestedGender: profile?.interestedGender,
        address: profile?.address
      };
      const formData = new FormData();
      if (avatar) {
        formData.append("avatar", avatar);
      }
      if (photosFiles.length > 0) {
        photosFiles.forEach((file) => {
          formData.append('photos', file);
        });
      }
      // Append other fields to the FormData object
      if (profileData.userName) formData.append("userName", profileData.userName);
      if (profileData.dob) formData.append("dob", profileData.dob);
      if (profileData.selfGender) formData.append("selfGender", profileData.selfGender);
      if (profileData.interestedGender) formData.append("interestedGender", profileData.interestedGender);
      if (profileData.mobileNumber) formData.append("mobileNumber", profileData.mobileNumber);
      if (profileData.profileText) formData.append("profileText", profileData.profileText);
      if (profileData.relationshipStatus) formData.append("relationshipStatus", profileData.relationshipStatus);
      if (profileData.children) formData.append("children", profileData.children);
      if (profileData.life) formData.append("life", profileData.life);
      if (profileData.smoker) formData.append("smoker", profileData.smoker);
      if (profileData.currentPassword) formData.append("currentPassword", profileData.currentPassword);
      if (profileData.newPassword) formData.append("newPassword", profileData.newPassword);
      if (profileData.address) formData.append("address", profileData.address);
      try {
        const response = await axios.put(`${BASE_URL}/updateProfile/${user?.id}`,
          formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
        );
        const updatedUserData = await response.data;
        if (updatedUserData) {
          if (isFormModified) setIsFormModified(false)
          toast.success(`Profile updated Successfully!`, {
            position: toast.POSITION.TOP_RIGHT,
          })
          setToken(updatedUserData);
          setProfileData({
            userName: updatedUserData?.userName,
            dob: adjustTimezoneOffset(updatedUserData?.profile?.dob),
            mobileNumber: updatedUserData?.profile?.mobileNumber,
            gender: updatedUserData?.selfGender,
            profileText: updatedUserData?.profile?.profileText,
            relationshipStatus: updatedUserData?.profile?.relationshipStatus,
            children: updatedUserData?.profile?.children,
            life: updatedUserData?.profile?.life,
            smoker: updatedUserData?.profile?.smoker,
            interestedGender: updatedUserData?.interestedGender,
            avatar: updatedUserData?.profile?.avatarUrl,
            profile: updatedUserData?.profile?.isProfileVerified,
            email: updatedUserData?.profile?.isEmailVerified,
            photos: updatedUserData?.photos,
            address: updatedUserData?.address?.address
          })

        }
        else {
          toast.error(`Couldn't update profile`, {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  };
  function adjustTimezoneOffset(dateString) {
    const date = new Date(dateString);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() - timezoneOffset);
    return adjustedDate.toISOString().slice(0, 10);
  }
  return (
    <div className={styled.profileRight}>
      <form enctype="multipart/form-data">
        <div className={styled.profileRightl}>
          <h3>profiles</h3>
          <p>This information will be displayed publicly, so be careful what you share.</p>
          <div className={styled.profileDetailsRight}>
            <ol>
              <li>
                <div className={profile?.email === "VERIFIED" ? styled.doneSection : styled.pendingSection}>
                  <FontAwesomeIcon size='1x' color='white' icon={profile?.email === "VERIFIED" ? faCheck : faMailBulk} />
                </div>

                <h4>Confirm your email</h4>
                <p>+ 16 coins</p>
              </li>
              <li>
                <div className={profile?.avatar || filePreview ? styled.doneSection : styled.pendingSection}>
                  <FontAwesomeIcon size='1x' color='white' icon={(profile?.avatar || filePreview) ? faCheck : faUpload} />
                </div>

                <h4>Avatar upload</h4>
                <p>+ 3 coins</p>
              </li>
              <li>
                <div className={(profile?.profile === "VERIFIED" || photosPreviews.length > 0) ? styled.doneSection : styled.pendingSection}>
                  <FontAwesomeIcon size='1x' color='white' icon={(profile?.profile === "VERIFIED" || photosPreviews.length > 0) ? faCheck : faUser} />
                </div>
                <h4>Your profile is verified </h4>
                <p>+ 5 coins</p>
                {profile.profile === "VERIFIED" ? null :
                  <Button variant='contained' onClick={handleOpen}>
                    Upload a photo
                  </Button>}
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
                <div className={profile.mobileNumber ? styled.doneSection : styled.pendingSection}>
                  <FontAwesomeIcon size='1x' color='white' icon={profile.mobileNumber ? faCheck : faPhone} />
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
                <input name='username' id='username' type='text' value={profile?.userName} onChange={(e) => { setProfileData({ ...profile, userName: e.target.value }); setIsFormModified(true); }} />
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='username'>Email address</label>
                <input type='email' name='email' id='email' value={user?.email} disabled />
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='dob'>Date of birth</label>
                <input type='date' id='dob' name='dob' value={profile?.dob ? adjustTimezoneOffset(profile?.dob) : ''} onChange={(e) => { setProfileData({ ...profile, dob: e.target.value }); setIsFormModified(true); }} />
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='postal-code'>Postal code  </label>
                <input type='text' id='postal-code' name='postal-code' value={profile?.address} onChange={(e) => { setProfileData({ ...profile, address: e.target.value }); setIsFormModified(true); }} disabled={!!user?.address?.address} />
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='gender'>Gender</label>
                <select id='gender' name='gender' onChange={(e) => { setProfileData({ ...profile, gender: e.target.value }); setIsFormModified(true); }}>
                  {/* <option></option> */}
                  {/* <option value="" selected disabled hidden>{profile?.gender[0]?.toUpperCase()+profile?.gender?.slice(1).toLowerCase()}</option> */}
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='phone'>Phone</label>
                <input type='tel' id='phone' name='phone' value={profile?.mobileNumber} onChange={(e) => { setProfileData({ ...profile, mobileNumber: e.target.value }); setIsFormModified(true); }} />
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupFull}`}>
                <label htmlFor='profile-text'>Profile text</label>
                <textarea name='profile-text' id='profile-text' cols='33' rows='5' value={profile?.profileText} onChange={(e) => { setProfileData({ ...profile, profileText: e.target.value }); setIsFormModified(true); }}></textarea>
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupFull}`}>
                <label htmlFor='profile-text'>Avatar</label>
                <input
                  type='file'
                  className='file-upload'
                  onChange={(e) => { handleAvatarChange(e); setIsFormModified(true); }}
                  style={{ display: 'none' }}
                />
                {
                  avatar ?
                    (<img
                      src={
                        filePreview
                          ? filePreview
                          : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                      }
                      alt='Profile Picture'
                      className={styled.profile_pic}
                    />)
                    :
                    <img src={`${profile?.avatar}`} alt='Profile Picture'
                      className={styled.profile_pic} />

                }

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
                  onChange={(e) => { handleMultipleChange(e); setIsFormModified(true); }}
                  style={{ display: 'none' }}
                  multiple
                  accept="image/*"
                />

                {/* Render existing photos */}
                {profile?.photos?.sort((a, b) => b.id - a.id).map((preview, index) => (
                  <div className={styled.multiImages} key={index}>
                    <img
                      src={`${preview.photos}`}
                      alt={`Profile Picture ${index + 1}`}
                      className={styled.multipleProfile}
                      style={{ width: '100px', height: '100px', marginRight: '10px' }}
                    />
                    <button
                      className={styled.crossButton}
                      onClick={(e) => {
                        e.preventDefault();
                        removePhoto(preview.id)
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}

                {/* Render new photos */}
                {photosPreviews.map((preview, index) => (
                  <div className={styled.multiImages} key={`new-${index}`}>
                    <img
                      src={preview}
                      alt={`Profile Picture ${index + 1}`}
                      className={styled.multipleProfile}
                      style={{ width: '100px', height: '100px', marginRight: '10px' }}
                    />
                    <button
                      className={styled.crossButton}
                      onClick={(e) => {
                        e.preventDefault();
                        removeSelectedPhoto(index)
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}

                <button className={styled.multipleUploadButton} onClick={handleMultiUploadClick}>
                  Upload
                </button>
              </div>
            </div>

            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='gender'>Relationship status</label>
                <select id='gender' name='gender' onChange={(e) => { setProfileData({ ...profile, relationshipStatus: e.target.value }); setIsFormModified(true); }}>
                  <option value="" selected disabled hidden>{profile?.relationshipStatus}</option>
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
                <select id='children' name='children' onChange={(e) => { setProfileData({ ...profile, children: e.target.value }); setIsFormModified(true); }}>
                  <option value="" selected disabled hidden>{profile?.children}</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <div className={styled.clear}>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='life'>Life</label>
                <select id='life' name='life' value={profile?.life} onChange={(e) => { setProfileData({ ...profile, life: e.target.value }); setIsFormModified(true); }}>
                  <option value="" selected disabled hidden>{profile?.life}</option>
                  <option>Alone</option>
                  <option>At parents</option>
                  <option>Flat Share</option>
                  <option>With partner</option>
                  <option>Miscellaneous</option>
                </select>
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <label htmlFor='smoker'>Smoker</label>
                <select id='smoker' name='smoker' onChange={(e) => { setProfileData({ ...profile, smoker: e.target.value }); setIsFormModified(true); }}>
                  <option value="" selected disabled hidden>{profile?.smoker}</option>
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
                <input type='password' name='pwd' id='pwd' onChange={(e) => { setProfileData({ ...profile, password: e.target.value }); setIsFormModified(true); }} />
              </div>
              <div className={`${styled.formGroup} ${styled.fromGroupHalf}`}>
                <h4 style={{ visibility: 'hidden' }}>Changed password</h4>
                <label htmlFor='newpwd'>New Passowrd</label>
                <input type='password' name='newpwd' id='newpwd' onChange={(e) => { setProfileData({ ...profile, newPassword: e.target.value }); setIsFormModified(true); }} />
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
                <input type='radio' id='male' name='gender' value='male' style={{ display: 'inline-block' }} checked={profile?.interestedGender?.toLowerCase() === 'male'} onChange={(e) => { setProfileData({ ...profile, interestedGender: e.target.value }); setIsFormModified(true); }} />
                <label htmlFor='male' style={{ display: 'inline-block', width: 'auto' }}>Male</label><br />
                <input type='radio' id='female' name='gender' value='female' style={{ display: 'inline-block' }} checked={profile?.interestedGender?.toLowerCase() === 'female'} onChange={(e) => { setProfileData({ ...profile, interestedGender: e.target.value }); setIsFormModified(true); }} />
                <label htmlFor='female' style={{ display: 'inline-block', width: 'auto' }}>Female</label><br />
              </div>
            </div>
          </div>
          <div className={styled.buttonSave}>
            <p>
              If you want to delete your account, click on the link below:{" "}
              <Link to='#' onClick={(event) => {
                event.preventDefault();
                setShowModal(true);
              }}>Delete Account</Link>
            </p>
            <button className={styled.profileRightButton} onClick={handleSubmit}>Save</button>
            <div style={{ clear: 'both' }}></div>
          </div>

        </div>
        <div>

        </div>
        {showModal && (
          <>
            {document.body.classList.add('hiddenScroll')}
            <div className={styled.overlayProfile}></div>
            <div className={styled.modelProfileTab}>
              <h4>Are you sure you want to delete your account?</h4>
              <button onClick={(e) => handleDeleteAccount(e, true)}>Yes</button>
              <button onClick={(e) => handleDeleteAccount(e, false)}>Cancel</button>
            </div>
          </>
        )}
        <div className={styled.clear}></div>
      </form>
    </div>
  );
};

export default ProfileTab;

//data:image;base64