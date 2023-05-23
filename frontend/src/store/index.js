import { configureStore } from '@reduxjs/toolkit';
// import setupAxios from './setupAxios/setupAxios';
import userAuthReducer from './slices/userAuth/userAuthSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    // authToken: setupAxios,
  },
});

export default store;
