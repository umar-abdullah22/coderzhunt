import React, { useState } from 'react';
import UserVerified from '../../../assets/images/userVerified.svg';
import UserProfile from '../../../assets/images/userP.jpg';
import style from './style.module.css';
import {Link} from "react-router-dom"
import { styled } from '@mui/material/styles';
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function valuetext(value) {
  return `${value}`;
}

const HomeUserIntresting = () => {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const classes = useStyles();
  const [value, setValue] = useState([0, 0]);

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={style.homeUserNewform}>
        <form className={style.filterForm}>
          <div className={style.row1}>
            <div className={style.rowa}>
              <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} label='Show Woman' />
            </div>
            <div className={style.rowa}>
              <FormControl fullWidth>
                <TextField
                  id='outlined-basic'
                  label='Username'
                  variant='outlined'
                  className={ClassNames.textField}
                />
              </FormControl>
            </div>
            <div className={style.rowa}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Select</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={age}
                  label='Age'
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={style.clear}></div>
          </div>

          <div className={style.row1}>
            <div className={style.rowa}>
              <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} label='Show Man' />
            </div>
            <div className={style.rowa}>
              <div className={classes.root}>
                <Typography id='range-slider' gutterBottom>
                  Old
                </Typography>
                <Slider
                  value={value}
                  onChange={handleChange1}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  getAriaValueText={valuetext}
                />
              </div>
            </div>
            <div className={style.rowa}>
              <Typography id='range-slider' gutterBottom>
                Distance
              </Typography>
              <Slider
                aria-label='Temperature'
                defaultValue={0}
                getAriaValueText={valuetext}
                valueLabelDisplay='auto'
                step={10}
                marks
                min={0}
                max={100}
              />
            </div>
            <div className={style.clear}></div>
          </div>
          <div className={style.form_group_btn}>
            <input type='submit' name='submit' value='Search' />
          </div>
        </form>
        <div className={style.clear}></div>
      </div>
      <div className={style.homeUserNewMain1}>
      <div className={style.homeUserNewInner}>
          <Link to='#'>
            <div className={style.userImage}>
              <img src={UserProfile} alt='' />
            </div>
            <div className={style.homeUserNewDetails}>
              <h3>
                Countess <span>49</span>
              </h3>
              <p>91XXX</p>
            </div>
            <div className={style.homeUserNewVerified}>
              <img src={UserVerified} alt='' />
            </div>
            <div className={style.homeUserNewOnline}>
              <div className={style.homeUserNewOnlineIcon}></div>
            </div>
          </Link>
        </div>

        <div className={style.homeUserNewInner}>
          <Link to='#'>
            <div className={style.userImage}>
              <img src={UserProfile} alt='' />
            </div>
            <div className={style.homeUserNewDetails}>
              <h3>
                Countess <span>49</span>
              </h3>
              <p>91XXX</p>
            </div>
            <div className={style.homeUserNewVerified}>
              <img src={UserVerified} alt='' />
            </div>
            <div className={style.homeUserNewOnline}>
              <div className={style.homeUserNewOnlineIcon}></div>
            </div>
          </Link>
        </div>

        <div className={style.homeUserNewInner}>
          <Link to='#'>
            <div className={style.userImage}>
              <img src={UserProfile} alt='' />
            </div>
            <div className={style.homeUserNewDetails}>
              <h3>
                Countess <span>49</span>
              </h3>
              <p>91XXX</p>
            </div>
            <div className={style.homeUserNewVerified}>
              <img src={UserVerified} alt='' />
            </div>
            <div className={style.homeUserNewOnline}>
              <div className={style.homeUserNewOnlineIcon}></div>
            </div>
          </Link>
        </div>

        <div className={style.homeUserNewInner}>
          <Link to='#'>
            <div className={style.userImage}>
              <img src={UserProfile} alt='' />
            </div>
            <div className={style.homeUserNewDetails}>
              <h3>
                Countess <span>49</span>
              </h3>
              <p>91XXX</p>
            </div>
            <div className={style.homeUserNewVerified}>
              <img src={UserVerified} alt='' />
            </div>
            <div className={style.homeUserNewOnline}>
              <div className={style.homeUserNewOnlineIcon}></div>
            </div>
          </Link>
        </div>

        <div className={style.homeUserNewInner}>
          <Link to='#'>
            <div className={style.userImage}>
              <img src={UserProfile} alt='' />
            </div>
            <div className={style.homeUserNewDetails}>
              <h3>
                Countess <span>49</span>
              </h3>
              <p>91XXX</p>
            </div>
            <div className={style.homeUserNewVerified}>
              <img src={UserVerified} alt='' />
            </div>
            <div className={style.homeUserNewOnline}>
              <div className={style.homeUserNewOnlineIcon}></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeUserIntresting;
