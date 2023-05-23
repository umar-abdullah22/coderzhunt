import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { toast } from 'react-toastify';
const BASE_URL = 'http://localhost:5500/api';

// User Registration API
export const fetchChat = createAsyncThunk(
  'chatAnnouncement/createChat',
  async (id, { rejectWithValue }) => {
    try {
      const token=JSON.parse(localStorage.getItem('token'))
      const user = JSON.parse(localStorage.getItem('user'));
      const data = await axios.get(`${BASE_URL}/chats/get-messages/?sender=${user.id}&receiver=${id}`, {
        headers: {
        Authorization:`Bearer ${token}`
      }}
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchChatusers = createAsyncThunk(
  'chatAnnouncement/fetchChatusers',
  async (chat, { rejectWithValue }) => {
    const accessToken =JSON.parse( localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('user'));

    const config = {
      params:{
        userId:user?.id
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const data = await axios.get(`${BASE_URL}/chats/getChatUsers`, config);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
