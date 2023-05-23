import React, { useEffect, useState, useCallback } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { makeStyles, Theme } from '@material-ui/core/styles';
import HomeUserNew from '../homeUserNew/HomeUserNew';
import HomeUserOnline from '../homeUserOnline/HomeUserOnline';
import styled from './style.module.css';
import HomeUserFSK from '../homeUserFSK/HomeUserFSK';
import HomeUserIntresting from '../homeUserIntresting/HomeUserIntresting';
import { customerListAction } from '../../../store/slices/userAuth/actions';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from '../../../providers/useUser';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    background: '#fff',
    color: '#000',
    '&.Mui-selected': {
      background: '#f7f7ff',
      color: '#000',
      boxShadow: '0px 0px 8px #777',
    },
  },
}));

const UserHomeTabs = (props) => {
  const classes = useStyles();
  const tabClasses = { root: classes.tab };
  const [tabIndex, setTabIndex] = useState(0);
  const [userList, setUserList] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [nextPageCount, setNextPageCount] = useState(userList?.nextPage);
  const [numResults, setNumResults] = useState(userList?.pageSize);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const dispatch = useDispatch();
  const { token } = useUser();

  const fetchUsersList = useCallback(async (tabIndex) => {
    var onlineCustomers = 0;
    var fskCustomers = false;
    var newCustomers = false;
    tabIndex === 2 ? (onlineCustomers = 1) : (onlineCustomers = 0);
    tabIndex === 1 ? (newCustomers = true) : (newCustomers = false);
    tabIndex === 3 ? (fskCustomers = true) : (fskCustomers = false);

    const payload = {
      page: 1,
      pageSize: 8,
      status: onlineCustomers,
      newUsers: newCustomers,
      fsk: fskCustomers,
      token,
    };

    // dispatch(customerListAction(payload))
    //   .then(unwrapResult)
    //   .then((result) => {
    //     setUserList(result.data);
    //   })
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsersList(tabIndex);
    }, 1000);
    return () => clearTimeout(timer);
  }, [fetchUsersList, tabIndex]);

  return (
    <div className={styled.homeNewUsersTabs}>
      <Box>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            inkBarStyle={{ color: 'yellow' }}
            TabIndicatorProps={{
              style: { background: 'transparent', height: 0 },
            }}
          >
            <Tab
              label='Intresting'
              sx={{ width: '25%', bgcolor: 'background.paper' }}
              classes={tabClasses}
            />
            <Tab
              label='New'
              sx={{ width: '25%', bgcolor: 'background.paper' }}
              classes={tabClasses}
            />
            <Tab
              label='On-line'
              sx={{ width: '25%', bgcolor: 'background.paper' }}
              classes={tabClasses}
            />
            <Tab
              label='FSK'
              sx={{ width: '25%', bgcolor: 'background.paper' }}
              classes={tabClasses}
            />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>
          {tabIndex === 0 && (
            <Box>
              <HomeUserIntresting listData={userList} />
            </Box>
          )}
          {/* {!!userList?.data?.length && 
          <> */}
          {tabIndex === 1 && (
            <Box>
              <HomeUserNew listData={userList} />
            </Box>
          )}
          {tabIndex === 2 && (
            <Box>
              <HomeUserOnline listData={userList} />
            </Box>
          )}
          {tabIndex === 3 && (
            <Box>
              <HomeUserFSK listData={userList} />
            </Box>
          )}
          {/* </>
          } */}
        </Box>
      </Box>
    </div>
  );
};

export default UserHomeTabs;
