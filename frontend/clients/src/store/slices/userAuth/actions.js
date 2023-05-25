import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = 'https://coderzhunt-backend-zizle.vercel.app/api';

// User Registration API
export const resigterUserAction = createAsyncThunk(
  'userAuth/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/registerUser`, user);
      toast.success('Congratulation! You are successfully registered!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    } catch (error) {
      toast.error('Error! You have enter wrong information', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);
// User ForgetPassword API
export const forgetPasswordAction = createAsyncThunk(
  'profile/forgetPassword',
  async (payload, thunkAPI) => {
    const { email } = payload;
    if (!email) {
      throw new Error('Email is required.');
    }
    try {
      const forgetPasswordResponse = await axios({
        method: 'post', //you can set what request you want to be
        url: `${BASE_URL}/auth/forget`,
        data: payload,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },

      })


      // Return the data as the fulfilled value
      toast.success(forgetPasswordResponse.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return forgetPasswordResponse.data;
    } catch (error) {
      // Reject the promise with an error message
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// User ForgetPassword API
export const resetPasswordAction = createAsyncThunk(
  'profile/resetPassword',
  async (payload, thunkAPI) => {
    const { newPassword, token } = payload;
    try {

      const newPasswordResponse = await axios({
        method: 'post', //you can set what request you want to be
        url: `${BASE_URL}/auth/reset-password`,
        data: { newPassword },
        headers: {
          token: `${token}`,
        },


      })

      toast.success(newPasswordResponse.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // Return the data as the fulfilled value
      return newPasswordResponse.data;
    } catch (error) {
      // Reject the promise with an error message
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// User Oauth Registration API
export const resigteroauthUserAction = createAsyncThunk(
  'userAuth/resigteroauthUserAction',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/social-join`, user);
      return data;
    } catch (error) {
      toast.error('Error! You have enter wrong information', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

// Moderator Registration API
export const resigterAdminModAction = createAsyncThunk(
  'userAuth/registerAdminMod',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/registerAdminMod`, user);

      toast.success('Congratulation! You are successfully Moderator registered!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    } catch (error) {
      toast.error('Error! You have enter wrong information', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

// Fetch User Data API Unverified
export const userLoginAction = createAsyncThunk(
  'userAuth/login',
  async (user, { rejectWithValue }) => {
    try {
      const userLogin = await axios.post(`${BASE_URL}/auth/login`, user);
      return userLogin.data;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error);
    }
  },
);


// Fetch User List Data API
const accessToken =JSON.parse( localStorage.getItem('token'));
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};
const configCustomer = {
  headers: {
    token: `${accessToken}`,
  },
};
export const userListAction = createAsyncThunk(
  'userAuth/userList',
  async (payload, { rejectWithValue }) => {
    try {
      const userList = await axios.get(`${BASE_URL}/auth/users`, config);
      return userList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//List Fake User
export const fakeUserListAction = createAsyncThunk(
  'userAuth/userList',
  async (payload, { rejectWithValue }) => {
    try {
      const userList = await axios.get(`${BASE_URL}/fake`, config);
      return userList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Update access user to Moderator
export const updateAccessAction = createAsyncThunk(
  'userAuth/updateAccess',
  async (payload, { rejectWithValue }) => {
    try {
      const updateAccess = await axios.put(`${BASE_URL}/auth/update-access`, payload, config);
      return updateAccess;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Admin Ban the Moderator
export const adminBanModAction = createAsyncThunk(
  '/userAuth/blockMod',
  async (payload, { rejectWithValue }) => {
    try {
      const blockMod = await axios.put(`${BASE_URL}/auth/block-mod`, payload, config);
      return blockMod;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Admin Edit the access of Moderator
export const adminEditAccessModAction = createAsyncThunk(
  '/userAuth/updateModAccess',
  async (payload, { rejectWithValue }) => {
    try {
      const updateModAccess = await axios.put(`${BASE_URL}/auth/update-access`, payload, config);
      return updateModAccess;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//Update Fake User
export const fakeEditAccessAction = createAsyncThunk(
  '/userAuth/updateFakeAccess',
  async (payload, { rejectWithValue }) => {
    try {

      const updateModAccess = await axios.put(`${BASE_URL}/fake/updateFake/${payload.id}`, payload, config);
      return updateModAccess;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Delete Fake
export const fakeDeleteAccessAction = createAsyncThunk(
  '/userAuth/deleteFakeAccess',
  async (payload, { rejectWithValue }) => {
    try {
      const deleteFake = await axios.delete(`${BASE_URL}/fake/deleteFake/${payload.id}`, config);
      toast.success('Fake Customer Deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return deleteFake;
    } catch (error) {
      toast.error('Fake Customer could not be deleted!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

//Subscription User
export const subscriptionsUserListAction = createAsyncThunk(
  'userAuth/userList',
  async (payload, { rejectWithValue }) => {
    try {
      const subsList = await axios.get(`${BASE_URL}/subscriptions`, config);
      return subsList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Payment User
export const paymentUserListAction = createAsyncThunk(
  'userAuth/userList',
  async (payload, { rejectWithValue }) => {
    try {
      const paymentsList = await axios.get(`${BASE_URL}/payments`, config)
        ;
      return paymentsList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


//Customer Api
export const customerListAction = createAsyncThunk(
  'userAuth/customerList',
  async (payload, { rejectWithValue }) => {
    try {
      const configcustomerListapi = {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      };
      let url = `${BASE_URL}/customer?`;
      if (payload.newUsers) { url += `newUsers=${payload.newUsers}&` }
      if (payload.online) { url += `online=${payload.online}&` }
      if (payload.page) { url += `page=${payload.page}&` }
      if (payload.pageSize) { url += `pageSize=${payload.pageSize}&` }
      if (payload.fsk) { url += `fsk=${payload.fsk}&` }
      if (payload.startAge) { url += `startAge=${payload.startAge}&` }
      if (payload.endAge) { url += `endAge=${payload.endAge}&` }
      if (payload.gender) { url += `gender=${payload.gender}&` }
      if (payload.distanceInMiles) { url += `distanceInMiles=${payload.distanceInMiles}&` }
      if (payload.nickname) { url += `nickname=${payload.nickname}&` }
      if (payload.postalCode) { url += `postalCode=${payload.postalCode}&` }

      if (payload.newUsers) {
        return await axios.get(url, configcustomerListapi);
      }
      if (payload.online) {
        return await axios.get(url, configcustomerListapi);
      }
      if (payload.fsk) {
        return await axios.get(url, configcustomerListapi);
      }
      if (payload.endAge > 18 || payload.gender !== "" || payload.distanceInMiles > 0 || payload.nickname !== "" || payload.postalCode !== "") {
        return await axios.get(url, configcustomerListapi);
      }

      return await axios.get(url, configcustomerListapi);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const bodyParameters = {
  key: "value"
}

//get-=user-coins
export const userCoinAction = createAsyncThunk(
  'userAuth/userList',
  async (payload, { rejectWithValue }) => {
    try {
      const userList = await axios.post(`${BASE_URL}/customer/get-coins`, bodyParameters, {
        headers: {
        Authorization:`Bearer ${payload.token}`
      }});
      return userList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//get-=user-coins-coast
export const userCoinCostAction = createAsyncThunk(
  'userAuth/userList',
  async (payload, { rejectWithValue }) => {
    try {
      const userList = await axios.get(`${BASE_URL}/coins`, config);
      return userList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//get-=user-coins-transaction
export const userCointransactionAction = createAsyncThunk(
  'userAuth/userList',
  async (payload, { rejectWithValue }) => {
    try {
      const userList = await axios.post(`${BASE_URL}/customer/make-transaction`, payload, config);
      return userList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchEmojis = createAsyncThunk(
  'chatAnnouncement/getEmojis',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${BASE_URL}/auth/get-emojis`, config);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);