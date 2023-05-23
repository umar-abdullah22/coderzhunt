import React from 'react';
import Typography from '@mui/material/Typography';
// import styled from './style.module.css';
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

const CoinManagement = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography variant='h6' sx={mainHeading}>
        Dashboard {'>'} Coin Management
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No. of Coin per Message</TableCell>
              <TableCell>No. of coins per email verification</TableCell>
              <TableCell>No. of coins per blur picture view</TableCell>
              <TableCell>No. of coins per profile emoji reaction</TableCell>
              <TableCell>No. of coins per view profile visitor</TableCell>
              <TableCell>No. of coins per upload avatar</TableCell>
              <TableCell>No. of coins per profile verified</TableCell>
              <TableCell>No. of coins per add phone number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>12</TableCell>
              <TableCell>12</TableCell>
              <TableCell>12</TableCell>
              <TableCell>12</TableCell>
              <TableCell>12</TableCell>
              <TableCell>12</TableCell>
              <TableCell>12</TableCell>
              <TableCell>12</TableCell>
              <TableCell>
                <Button
                  onClick={handleOpen}
                  sx={{
                    minWidth: 'auto',
                    float: 'left',
                    width: '50%',
                  }}
                >
                  <FontAwesomeIcon icon={faEye} />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={style}>
                      <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Text in a modal
                      </Typography>
                      <form>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: '100%',
                            marginTop: '30px',
                            marginBottom: '10px',
                          }}
                        >
                          <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-99]*' }}
                            fullWidth
                            label='No. of Coin per Message'
                            id='no-of-Coin-per-Message'
                          />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: '100%',
                            marginBottom: '10px',
                          }}
                        >
                          <TextField
                            fullWidth
                            inputProps={{ inputMode: 'numeric', pattern: '[0-99]*' }}
                            label='No. of coins per email verification'
                            id='no-of-coins-per-email-verification'
                          />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: '100%',
                            marginBottom: '10px',
                          }}
                        >
                          <TextField
                            fullWidth
                            inputProps={{ inputMode: 'numeric', pattern: '[0-99]*' }}
                            label='No. of coins per blur picture view'
                            id='no-of-coins-per-blur-picture-view'
                          />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: '100%',
                            marginBottom: '10px',
                          }}
                        >
                          <TextField
                            fullWidth
                            inputProps={{ inputMode: 'numeric', pattern: '[0-99]*' }}
                            label='No. of coins per profile emoji reaction'
                            id='no-of-coins-per-profile-emoji-reaction'
                          />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: '100%',
                            marginBottom: '10px',
                          }}
                        >
                          <TextField
                            fullWidth
                            inputProps={{ inputMode: 'numeric', pattern: '[0-99]*' }}
                            label='No. of coins per view profile visitor'
                            id='no-of-coins-per-view-profile-visitor'
                          />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: '100%',
                            marginBottom: '10px',
                          }}
                        >
                          <TextField
                            fullWidth
                            inputProps={{ inputMode: 'numeric', pattern: '[0-99]*' }}
                            label='No. of coins per upload avatar'
                            id='no-of-coins-per-upload-avatar'
                          />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: '100%',
                            marginBottom: '10px',
                          }}
                        >
                          <TextField
                            fullWidth
                            inputProps={{ inputMode: 'numeric', pattern: '[0-99]*' }}
                            label='No. of coins per profile verified'
                            id='no-of-coins-per-profile-verified'
                          />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: '100%',
                            marginBottom: '10px',
                          }}
                        >
                          <TextField
                            fullWidth
                            inputProps={{ inputMode: 'numeric', pattern: '[0-99]*' }}
                            label='No. of coins per add phone number'
                            id='no-of-coins-per-add-phone-number'
                          />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: '100%',
                          }}
                        >
                          <Button variant='contained'>
                            Submit
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Modal>
                </Button>
                <Button
                  sx={{
                    minWidth: 'auto',
                    float: 'left',
                    width: '50%',
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoinManagement;
