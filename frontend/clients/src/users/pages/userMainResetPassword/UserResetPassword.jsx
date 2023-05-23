import React from 'react';
// import UserMainRegister from '../../components/userResetPassword/UserResetPassword';
import UserResetPassword from '../../components/userMainResetPassword/UserResetPassword';
const UserResetPasswords = ({ setToken }) => {
  return (
    <div>
      <UserResetPassword setToken={setToken} />
    </div>
  );
};

export default UserResetPasswords;
