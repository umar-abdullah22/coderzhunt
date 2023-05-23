import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = 'http://localhost:5500/api';

const accessToken = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

//moderator crud api's
export const createModeratorAction = createAsyncThunk(
  'userAuth/createModerator',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/mod`, payload,config);

      toast.success('Moderator Created Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    } catch (error) {
      toast.error('Error! Moderator Could not be created!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

export const getModeratorsAction = createAsyncThunk(
  'userAuth/getModerators',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/auth/mods`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteModeratorAction = createAsyncThunk(
  'userAuth/deleteModerator',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/auth/mod/${payload?.id}`, config);
      if (data?.message === 'User Deleted successfully') {
      toast.success('Moderator Deleted Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    }
    } catch (error) {
      toast.error('Error! Moderator Could not be deleted!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

export const editModeratorAction = createAsyncThunk(
  'userAuth/editModerator',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/auth/mod/${payload?.id}`, payload,config);
      // if (data?.message === 'Bonus Code updated Successfully') {
      toast.success('Moderator Updated Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    
    } catch (error) {
      toast.error('Error! Moderator Could not be updated!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

export const chatModeratorAction = createAsyncThunk(
  'userAuth/editModerator',
  async (payload, { rejectWithValue }) => {
    try {
      var {data:{chats:recieved}} = await axios.get(`${BASE_URL}/auth/stats-user-messages?modId=${payload.modId}&duration=${payload.duration}`,config);
      var {data:{chats:send}} = await axios.get(`${BASE_URL}/auth/stats-user-replies?modId=${payload.modId}&duration=${payload.duration}`,config);
      
      return [recieved,send];
    } catch (error) {
      toast.error('Error! Information could not be fetched!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);
export const onlineModeratorAction = createAsyncThunk(
  'userAuth/editModerator',
  async (payload, { rejectWithValue }) => {
    try {
      var { data } = await axios.get(`${BASE_URL}/auth/online-stats`,config);

      return data;
    
    } catch (error) {
      toast.error('Error! Information could not be fetched!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

//bonus code api's
export const createBonusCodeAction = createAsyncThunk(
  'userAuth/createBonusCode',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/bonus-code`, payload,config);

      toast.success('Bonus Code Created Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    } catch (error) {
      toast.error('Error! Bonus Code Could not be created!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

export const getBonusCodesAction = createAsyncThunk(
  'userAuth/getBonusCodes',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/auth/bonus-codes`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteBonusCodesAction = createAsyncThunk(
  'userAuth/deleteBonusCode',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/auth/bonus-code/${payload?.id}`, config);
      if (data?.message === 'Bonus Code Deleted Successfully') {
      toast.success('Bonus Code Deleted Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    }
    } catch (error) {
      toast.error('Error! Bonus Code Could not be deleted!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

export const editBonusCodesAction = createAsyncThunk(
  'userAuth/editBonusCode',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/auth/bonus-code/${payload?.id}`, payload,config);
      // if (data?.message === 'Bonus Code updated Successfully') {
      toast.success('Bonus Code Updated Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    
    } catch (error) {
      toast.error('Error! Bonus Code Could not be updated!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);
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
      return userLogin;
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error);
    }
  },
);

// Fetch User List Data API

export const userListAction = createAsyncThunk(
  'userAuth/userList',
  async (payload, { rejectWithValue }) => {
    try {
      const userList = await axios.get(`${BASE_URL}/auth/users`, config);
      return userList.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const blockModeratorAction = createAsyncThunk(
  'userAuth/blockModerator',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/auth/block-mod`, payload,config);
      // if (data?.message === 'Bonus Code updated Successfully') {
      toast.success('Moderator Blocked Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    
    } catch (error) {
      toast.error('Error! Moderator Could not be blocked!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

// Verify User API

export const verifyUserAction = createAsyncThunk(
  'userAuth/verifyUser',
  async (payload, { rejectWithValue }) => {
    try {
      const verifyUser = await axios.post(`${BASE_URL}/auth/verify-profile/${payload}`, {}, config);
      toast.success("User Verified successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return verifyUser.data;
    } catch (error) {
      toast.error('Unable to verify!', {
        position: toast.POSITION.TOP_RIGHT,
      });
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
      const updateModAccess = await axios.put(
        `${BASE_URL}/fake/updateFake/${payload.id}`,
        payload,
        config,
      );
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
      toast.error('Fake Customer Could not be deleted!', {
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

//Update Subscription User
export const subscriptionEditAccessAction = createAsyncThunk(
  '/subsAuth/updateSubsAccess',
  async (payload, { rejectWithValue }) => {
    try {
      const updateSubsAccess = await axios.put(
        `${BASE_URL}/subscriptions/updateSubscription/${payload.id}`,
        payload,
        config,
      );
      return updateSubsAccess;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Delete Subscription
export const subsDeleteAccessAction = createAsyncThunk(
  '/userAuth/deleteSubsAccess',
  async (payload, { rejectWithValue }) => {
    try {
      const deleteSubs = await axios.delete(
        `${BASE_URL}/subscriptions/deleteSubscription/${payload.id}`,
        config,
      );
      toast.success('Subs Customer Deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return deleteSubs;
    } catch (error) {
      toast.error('Subscription could not be deleted!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  },
);

// ADD gifts
export const resigterGiftAction = createAsyncThunk(
  'userFakeAuth/registerFakeUser',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('actionType', payload.actionType);
      formData.append('cost', payload.cost);
      formData.append('imageUrl', payload.imageUrl)


      const data = await axios.post(`${BASE_URL}/coins/create-gift`, formData, config);
      toast.success('Congratulation! You successfully registered Gift!', {
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

//all gifts
export const getrGiftAction = createAsyncThunk(
  'userFakeAuth/registerFakeUser',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${BASE_URL}/coins/gifts`, config);;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//update gifts
export const updaterGiftAction = createAsyncThunk(
  'userFakeAuth/registerFakeUser',
  async (payload, { rejectWithValue }) => {
    try {
       const formData = new FormData();
      formData.append('actionType', payload.actionType);
      formData.append('cost', payload.cost);
      formData.append('imageUrl', payload.imageUrl)

      const data = await axios.put(`${BASE_URL}/coins/update-gift/${payload.id}`, formData, config);
      toast.success('Successfully Gift Updated!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//delete gifts
export const deleteGiftAction = createAsyncThunk(
  'userFakeAuth/registerFakeUser',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await axios.delete(`${BASE_URL}/coins/gift/${payload.id}`, config);
      toast.success('Successfully Gift Deleted!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);