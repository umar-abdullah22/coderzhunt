// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Moderator
import Home from './moderator/pages/home/Home';
import ModeratorStats from './moderator/pages/moderatorStatistics/ModeratorStats';
import FakeSendUser from './moderator/pages/fakeSendUsers/FakeSendUsers';

import Login from './moderator/components/login/Logins';
import Register from './moderator/components/register/RegisterUser';

//toast
import { ToastContainer } from 'react-toastify';

// Socket
import { ConnectionProvider } from './socket/SocketConnection';
import { UserProvider } from './providers/useUser';

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* <Route path='/admin/login' element={<Login />} /> */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path="/admin/login" element={<Login />} /> */}
      </Routes>
      <ConnectionProvider>
        <Routes>
          {/* Moderator */}
          <Route path='/home' element={<Home />} />
          <Route path='/moderator' element={<ModeratorStats />} />
          <Route path='/visit-fake-users' element={<FakeSendUser />} />
        </Routes>
      </ConnectionProvider>
    </>
  );
}
const AppWrapper = () => (
  <UserProvider>
    <App />
  </UserProvider>
);
export default AppWrapper;
