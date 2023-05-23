import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import HomeUserNew from '../homeUserNew/HomeUserNew';
import HomeUserOnline from '../homeUserOnline/HomeUserOnline';
import styled from './style.module.css';
import HomeUserFSK from '../homeUserFSK/HomeUserFSK';
import HomeUserIntresting from '../homeUserIntresting/HomeUserIntresting';

const UserHomeTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <div className={styled.homeNewUsersTabs}>
      <Box>
        <Box>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label='Intresting' />
            <Tab label='New' />
            <Tab label='On-line' />
            <Tab label='FSK' />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>
          {tabIndex === 0 && (
            <Box>
              <HomeUserIntresting />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box>
              <HomeUserNew />
            </Box>
          )}
          {tabIndex === 2 && (
            <Box>
              <HomeUserOnline />
            </Box>
          )}
          {tabIndex === 3 && (
            <Box>
              <HomeUserFSK />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default UserHomeTabs;
