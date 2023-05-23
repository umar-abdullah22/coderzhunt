import { ClassNames } from '@emotion/react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
// import { styled } from './style.module.css';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useCallback, useEffect, useState } from 'react';
import Switch from 'react-ios-switch';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import UserVerified from '../../../assets/images/userVerified.svg';
import { customerListAction } from '../../../store/slices/userAuth/actions';
import style from './style.module.css';
import { profileVisitorList } from '../../../store/slices/customerAPI/action';
import MaleAvatr from '../../../assets/images/male.png';
import FemaleAvatr from '../../../assets/images/female.png';
import { useUser } from '../../../providers/useUser';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const HomeUserIntresting = (props) => {
  // const [age, setAge] = useState('');
  const [nextPage, setNextPage] = useState(2);
  const [showwomen, setShowwomen] = useState(false);
  const [postalcode, setPostalcode] = useState('');
  const [showmen, setShowmen] = useState(false);
  const [username, setUsername] = useState('');
  const [distance, setDistance] = useState('');
  const [listData, setListData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(listData?.page);
  const [usersList, setUsersList] = useState(listData?.data);
  const [numResults, setNumResults] = useState(listData?.pageSize);
  const allResults = usersList;
  const { token } = useUser();
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  const classes = useStyles();
  const [value, setValue] = useState([18, '']);

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value}`;
  }
  function calculateAge(birthDateString) {
    var birthDate = new Date(birthDateString);
    var difference = Date.now() - birthDate.getTime();
    var ageDate = new Date(difference);
    var calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge ? calculatedAge : '';
  }

  const fetchUsersList = useCallback(
    async (value, showwomen, showmen, username, postalcode, distance) => {
      var genderValue = '';
      if (!showmen && !showwomen) {
        genderValue = '';
      } else if (showwomen) {
        genderValue = 'female';
      } else if (showmen) {
        genderValue = 'male';
      }
      const payload = {
        page: 1,
        pageSize: 8,
        gender: genderValue,
        nickname: username,
        startAge: value[0],
        endAge: value[1],
        distanceInMiles: distance,
        postalCode: postalcode,
        token: token,
      };

      dispatch(customerListAction(payload))
        .then(unwrapResult)
        .then((result) => {
          setIsLoading(false);
          setListData(result.data);
          // setNextPage(result.nextPage)
        })
        .catch((error) => {});
    },
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsersList(value, showwomen, showmen, username, postalcode, distance);
    }, 1000);
    return () => clearTimeout(timer);
  }, [value, showwomen, showmen, username, postalcode, distance]);

  const handleShowMorePosts = () => {
    // setNextPage(1 + nextPage) // Get the next page count
    const payload = {
      page: nextPage,
      pageSize: 8,
      token: token,
    };
    if (nextPage !== null) {
      setLoading(true); // Show loading spinner
    }

    dispatch(customerListAction(payload))
      .then(unwrapResult)
      .then((result) => {
        result = result.data;
        const newResults = result.data;
        setNextPage(result.nextPage);
        setListData((prevListData) => ({
          data: [...prevListData.data, ...newResults],
          nextPage: result.nextPage,
        }));
        setPageCount(newResults.nextPage);
        setLoading(false); // Hide loading spinner
      })
      .catch((error) => {
        setLoading(false); // Hide loading spinner
      });
  };
  // const handleInputChange = (e) => {
  //   setUsername(e.target.value);
  // };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUsername(inputValue);
  };

  return (
    <div>
      <div className={style.homeUserNewform}>
        <form className={style.filterForm}>
          <div className={style.grid}>
            <div className={style.gridItem}>
              {/* <Stack direction='row' spacing={1}>
                <p>Show Women</p>
                <Switch checked={showwomen} onChange={() => setShowwomen(!showwomen)} />
              </Stack> */}
              <Stack direction='row' spacing={1}>
                <Switch
                  checked={showwomen}
                  onChange={() => {
                    setShowwomen(!showwomen);
                    setShowmen(false); // Close "Show Men" option
                  }}
                />
                <p style={{ marginTop: '5px' }}>Show Women</p>
              </Stack>
            </div>
            <div className={style.gridItem}>
              <FormControl fullWidth>
                <TextField
                  id='outlined-basic'
                  label='Username'
                  variant='outlined'
                  value={username}
                  onChange={handleInputChange} // update this line
                  className={ClassNames.textField}
                />
              </FormControl>
            </div>
            <div className={style.gridItem}>
              <FormControl fullWidth>
                <TextField
                  id='outlined-basic'
                  label='Postal Code'
                  variant='outlined'
                  className={ClassNames.textField}
                  value={postalcode}
                  onChange={(e) => setPostalcode(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <LocationOnIcon style={{ color: 'black' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>
            <div className={style.gridItem}>
              {/* <Stack direction='row' spacing={1}>
                <p>Show Men</p>
                <Switch checked={showmen} onChange={() => setShowmen(!showmen)} />
              </Stack> */}
              <Stack direction='row' spacing={1}>
                <Switch
                  checked={showmen}
                  onChange={() => {
                    setShowmen(!showmen);
                    setShowwomen(false); // Close "Show Women" option
                  }}
                />
                <p style={{ marginTop: '5px' }}>Show Men</p>
              </Stack>
            </div>
            <div className={style.gridItem}>
              <div className={style.slider}>
                <Typography id='range-slider' gutterBottom>
                  Old
                </Typography>
                <Slider
                  value={value}
                  min={18}
                  max={65}
                  onChange={handleChange1}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  getAriaValueText={valuetext}
                  defaultValue={18}
                />
              </div>
            </div>
            <div className={style.gridItem}>
              <div className={style.slider}>
                <Typography id='range-slider' gutterBottom>
                  Distance
                </Typography>
                <Slider
                  aria-label='Temperature'
                  value={distance}
                  onChange={(e, newValue) => setDistance(newValue)}
                  getAriaValueText={valuetext}
                  valueLabelDisplay='auto'
                  step={10}
                  marks
                  min={0}
                  max={100}
                />
              </div>
            </div>
          </div>
        </form>
        <div className={style.clear}></div>
      </div>
      <div className={style.homeUserNewMain1}>
        {isLoading ? (
          <CircularProgress color='secondary' style={{ marginLeft: '50%' }} />
        ) : (
          <>
            {listData?.data?.map((userDataModal) => (
              <div className={style.homeUserNewInner}>
                <Link to={`/profile/${userDataModal?.id}`}>
                  <div className={style.userImage}>
                    {userDataModal?.profile?.avatarUrl === null ? (
                      userDataModal.selfGender === 'MALE' ? (
                        <img src={MaleAvatr} alt='' />
                      ) : (
                        <img src={FemaleAvatr} alt='' />
                      )
                    ) : (
                      <img src={`${userDataModal?.profile?.avatarUrl}`} alt='' />
                    )}
                  </div>
                  <div className={style.homeUserNewDetails}>
                    <h3>
                      {userDataModal?.userName}{' '}
                      <span>{calculateAge(userDataModal?.profile?.dateOfBirth)}</span>
                    </h3>
                    <p> {userDataModal?.profile?.mobileNumber}</p>
                    {userDataModal?.profile?.isProfileVerified === 'VERIFIED' && (
                      <div className={style.homeUserNewVerified}>
                        <img src={UserVerified} alt='' />
                      </div>
                    )}
                  </div>

                  <div className={style.homeUserNewOnline}>
                    <div
                      className={
                        userDataModal?.online
                          ? style.homeUserNewOnlineIcon
                          : style.homeUserNewOfflineIcon
                      }
                    ></div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
        {nextPage !== null && (
          <button
            className={style.loadMoreBtn}
            onClick={handleShowMorePosts}
            disabled={nextPage === null}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
        {/* )} */}
        {/* <button onClick={handleShowMorePosts}>Load more</button> */}
      </div>
    </div>
  );
};

export default HomeUserIntresting;
