import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = 'https://coderzhunt-backend-zizle.vercel.app/api';

const accessTokenAdmin = localStorage.getItem('token');

const config = {
  headers: {
    Authorization: `Bearer  ${accessTokenAdmin}`,
    'accept': 'application/json',
    // 'Accept-Language': 'en-US,en',
    // 'Content-Type': `multipart/form-data`,
  },
};

// User Registration API
export const resigterFakeUserAction = createAsyncThunk(
  'userFakeAuth/registerFakeUser',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append('file', payload.file);
      formData.append('userName', payload.userName);
      formData.append('creator', payload.creator);
      formData.append('role', payload.role);
      formData.append('selfGender', payload.selfGender);
      formData.append('interestedGender', payload.interestedGender);
      formData.append('relationshipStatus', payload.relationshipStatus);
      formData.append('life', payload.life);
      formData.append('smoker', payload.smoker);
      formData.append('children', payload.children);
      formData.append('age', payload.age);
      formData.append('dob', payload.dob);
      formData.append('postalCode', payload.postalCode);
      formData.append('email', payload.email);

      // formData.append("projectInfo", payload.project.projectInfo);
      // formData.append("projectCompensation", payload.project.projectCompensation);

      const data = await axios.post(`${BASE_URL}/fake/createFake`, formData, config);

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

//Subscription Registration API
export const resigterSubsUserAction = createAsyncThunk(
  'userSubsAuth/registerrSubsUser',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        `${BASE_URL}/subscriptions/createSubscription`,
        payload,
        config,
      );

      toast.success('Congratulation! Package are successfully registered!', {
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

