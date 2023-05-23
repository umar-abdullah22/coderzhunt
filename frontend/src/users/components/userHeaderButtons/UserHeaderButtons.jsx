import React from 'react';
import { Link } from 'react-router-dom';
import styled from './style.module.css';

const UserHeaderButtons = () => {
  return (
    <div>
      <ul className={styled.header_btns}>
        {/* <li>
          <Link to='/user/setting'>Setting</Link>
        </li> */}
        <li>
          <Link to='/user/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/user/data-protection'>Data protection</Link>
        </li>
        <li>
          <Link to='/user/term-of-use'>Term of Use</Link>
        </li>
        <li>
          <Link to='/user/imprint'>Imprint</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserHeaderButtons;
