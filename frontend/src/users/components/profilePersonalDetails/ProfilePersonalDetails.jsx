import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import EditIcon from '../../../assets/images/edit_icon.svg';
import styled from './style.module.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
    overflow: 'hidden',
  },
}));

export default function ProfilePersonalDetails() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <div className={styled.main_general}>
        <div className={styled.head_left}>
          <Typography variant='h6' component='h6'>
            Profile text
          </Typography>
        </div>
        <div className={styled.head_right}>
          <Link to='#' onClick={handleOpen}>
            <p>to edit</p>
            <img src={EditIcon} alt='' />
          </Link>
        </div>
        <div className={styled.clear}></div>

        <div className={styled.details_inner}>
          <p></p>
        </div>
      </div>

      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h4 className={styled.formHeading}>General</h4>
          <form className={styled.formGeneralMOd}>
            <div className={styled.form_group}>
              <label>Biography</label>
              <textarea></textarea>
            </div>

            <div className={styled.form_group}>
              <input type='submit' />
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
}
