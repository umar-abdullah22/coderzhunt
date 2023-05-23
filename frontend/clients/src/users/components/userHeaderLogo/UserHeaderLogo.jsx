import React from 'react';
import { Link } from 'react-router-dom';
import MainLogo from "../../../assets/images/logo_main.png"
const UserHeaderLogo = () => {
  return (
    <div className='logo_user'>
      <Link to='/userHome'>
        <img src={MainLogo} alt='logo_image' style={{ maxWidth: "100px", paddingTop: "5px" }} />
      </Link>
    </div>
  );
};

export default UserHeaderLogo;
