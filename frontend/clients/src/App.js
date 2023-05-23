/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
//toast
import { ToastContainer } from 'react-toastify';

import { UserProvider, useUser } from './providers/useUser';
// Socket
import { ConnectionProvider } from './socket/SocketConnection';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
function App() {
  const { token } = useUser();
  return (
    <>
      <ToastContainer />
      <HelmetProvider>
        <ConnectionProvider>
          <Router />
        </ConnectionProvider>
      </HelmetProvider>
    </>
  );
}
const AppWrapper = () => (
  <UserProvider>
    <App />
  </UserProvider>
);
export default AppWrapper;
