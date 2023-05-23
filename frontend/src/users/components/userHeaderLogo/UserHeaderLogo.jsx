import React from 'react';
import { Link } from 'react-router-dom';
const UserHeaderLogo = () => {
  return (
    <div className='logo_user'>
      <Link to='/'>
        <img src='../../../assets/images/logo_main.jpg' alt='logo_image' />
      </Link>
    </div>
  );
};

export default UserHeaderLogo;
