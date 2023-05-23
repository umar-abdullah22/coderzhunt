import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = 'http://localhost:5500/api';

const token = localStorage.getItem('token')
//adminGetUserList Api

export const adminCustomerListAction = createAsyncThunk(
  'adminApi/userList',
  async (payload, { rejectWithValue }) => {
    try {

      const response = await axios({
        method: 'get', //you can set what request you want to be
        url: `${BASE_URL}/auth/users`,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  },
);





// //sendBulk messages Api

// export const sendSpamMessagesAction = createAsyncThunk(
//   'adminApi/sendSpamMessages',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await axios({
//         method: 'post',
//         url: `${BASE_URL}/notes/createNotes`, data: payload,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       toast.success(response.statusText, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//       return response;
//     }
//     catch (error) {
//       const messages = error.response.data.message;
//       for (let i = 0; i < messages.length; i++) {
//         toast.error(messages[i], {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }
//       return rejectWithValue(error.message);
//     }
//   },
// );







//sendSpamMessages Api

export const sendSpamMessagesAction = createAsyncThunk(
  'adminApi/sendSpamMessages',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/auth/send-spam-messages`, data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // toast.success("Visits sent successfully!", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return response;
    }
    catch (error) {
      // const messages = error.response.data.message
      return rejectWithValue(error.message);
    }
  },
);


// Empty state action


export const emptyStateAction = createAsyncThunk(
  'moderatorApi/emptyState',
  async (_, { rejectWithValue }) => {
    try {
      return { fakeUserBulkIds: [], realCustomerBulkIds: [] };
    } catch (error) {
      const messages = error.response.data.message;
      for (let i = 0; i < messages.length; i++) {
        toast.error(messages[i], {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      return rejectWithValue(error.message);
    }
  },
);












// export const emptyStateAction = () => ({
//   return {
//     ...state,
//     fakeUserBulkIds: [],
//     realCustomerBulkIds: [],
//   };
// });

// // Reducer function
// function reducer(state = { fakeUserBulkIds: [], realCustomerBulkIds: [] }, action) {
//   switch (action.type) {
//     case 'EMPTY_STATE':

//     default:
//       return state;
//   }
// }