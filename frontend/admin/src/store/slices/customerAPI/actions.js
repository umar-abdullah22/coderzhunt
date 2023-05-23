import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = 'http://localhost:5500/api';

const accessToken = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

export const customerGeneralAction = createAsyncThunk(
    'customerAPI/updateProfile',
    async (payload, { rejectWithValue }) => {
      try {
        const {relationshipStatus,children,smoker,life}=payload
        const data={
            relationshipStatus,
            children,
            smoker,
            life,
        }
        const customerGeneral  = await axios.put(`${BASE_URL}/customer/updateProfile/${payload.id}`, data, config);
        return customerGeneral;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );