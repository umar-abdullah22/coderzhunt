import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = 'https://coderzhunt-backend-zizle.vercel.app/api';

const accessToken =JSON.parse( localStorage.getItem('token'));
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

export const customerGeneralAction = createAsyncThunk(
  'customerAPI/updateProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const { relationshipStatus, children, smoker, life } = payload
      const data = {
        relationshipStatus,
        children,
        smoker,
        life,
      }
      const customerGeneral = await axios.put(`${BASE_URL}/customer/updateProfile/${payload.id}`, data, config);
      return customerGeneral;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const visitedProfile = createAsyncThunk(
  'profile/visitedProfile',
  async (payload, thunkAPI) => {
    const data = {
      headers: {
        token: accessToken
      }
    }
    try {

      const response = await axios({
        method: 'post', //you can set what request you want to be
        url: `${BASE_URL}/customer/visit-profile/${payload.id}`,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })

      // Parse the response data
      const data = await response.json();

      // Return the data as the fulfilled value
      return data.data;
    } catch (error) {
      // Reject the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addToFavourite = createAsyncThunk(
  'profile/favouriteProfile',
  async (payload, thunkAPI) => {
    const data = {
      headers: {
        token: accessToken
      }
    }
    try {

      const response = await axios({
        method: 'post', //you can set what request you want to be
        url: `${BASE_URL}/customer/favorite/${payload.id}`,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })

      // Parse the response data
      const data = await response.json();

      // Return the data as the fulfilled value
      return data.data;
    } catch (error) {
      // Reject the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addToBlockList = createAsyncThunk(
  'profile/addToBlockListProfile',
  async (payload, thunkAPI) => {
    const data = {
      headers: {
        token: accessToken
      }
    }
    try {

      const addToBlockListresponse = await axios({
        method: 'post', //you can set what request you want to be
        url: `${BASE_URL}/customer/block/${payload.id}`,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },

      })

      // Parse the response data
      const data = await addToBlockListresponse.json();

      // Return the data as the fulfilled value
      return data.data;
    } catch (error) {
      // Reject the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeFromBlockListAction = createAsyncThunk(
  'profile/removeFromBlockList',
  async (payload, thunkAPI) => {
    try {

      const removeFromBlockListResponse = await axios({
        method: 'put',
        url: `${BASE_URL}/customer/block/${payload.id}`,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },

      })

      // Parse the response data
      const data = await removeFromBlockListResponse.json();

      // Return the data as the fulfilled value
      return data.data;
    } catch (error) {
      // Reject the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const profileVisitorList = createAsyncThunk(
  'profile/profileVisitedBy',
  async (payload, thunkAPI) => {
    const data = {
      headers: {
        token: accessToken
      }
    }
    try {

      const visitorListResponse = await axios({
        method: 'get', //you can set what request you want to be
        url: `${BASE_URL}/customer/profiles`,
        headers: {
          Authorization: 'Bearer '+payload.token,
        },

      })

      // Parse the response data
      // const data = await visitorListResponse.json();

      // Return the data as the fulfilled value
      return visitorListResponse.data;
    } catch (error) {
      // Reject the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const favouriteUsersList = createAsyncThunk(
  'profile/favouriteUsersList',
  async (payload, thunkAPI) => {
    try {

      const favouriteUsersListResponse = await axios({
        method: 'get', //you can set what request you want to be
        url: `${BASE_URL}/customer/favorites`,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },

      })

      // Parse the response data
      // const data = await visitorListResponse.json();

      // Return the data as the fulfilled value
      return favouriteUsersListResponse.data;
    } catch (error) {
      // Reject the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const blockedUsersListAction = createAsyncThunk(
  'profile/blockedUsersList',
  async (payload, thunkAPI) => {
    try {

      const blockedUsersListResponse = await axios({
        method: 'post', //you can set what request you want to be
        url: `${BASE_URL}/customer/blockUsers`,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },

      })

      // Parse the response data
      // const data = await visitorListResponse.json();

      // Return the data as the fulfilled value
      return blockedUsersListResponse.data;
    } catch (error) {
      // Reject the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getUserByIdAction = createAsyncThunk(
  'profile/getUserById',
  async (payload, thunkAPI) => {
    try {
      const getUserByIdResponse = await axios({
        method: 'get', //you can set what request you want to be
        url: `${BASE_URL}/customer/${payload.id}`,

        headers: {
          Authorization: `Bearer ${payload.token}`,
        },

      })

      // Parse the response data
      // const data = await visitorListResponse.json();

      // Return the data as the fulfilled value
      const userListData = getUserByIdResponse.data;
      return userListData;
    } catch (error) {
      // Reject the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getRandomUser = createAsyncThunk(
  'customerAPI/getRandomUser',
  async (payload, { rejectWithValue }) => {
    try {
      const userList = await axios.get(`${BASE_URL}/customer/getRandomUser`, {
         headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      });
      const serializableData = userList.data; // extract the serializable data
      return serializableData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


export const customerSupport = createAsyncThunk(
  'customer/contact-support',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${BASE_URL}/customer/contact-support`, payload, {
        headers: {
          Authorization: `Bearer ${payload?.token}`,
        }
      });
      // const serializableData = userList.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


// getAllGiftList
export const userGiftListAction = createAsyncThunk(
  'profile/userGiftList',
  async (payload, { rejectWithValue }) => {
    try {
      const giftList = await axios.post(`${BASE_URL}/coins/gifts`);
      return giftList.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// giftTransaction
export const gifTransactionAction = createAsyncThunk(
  'profile/userGiftTransaction',
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post(`${BASE_URL}/customer/make-transaction`, payload, config);
      // toast.success('Fake Customer Deleted successfully!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });

      // return giftTransaction;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.response.data.message);
    }
  },
);