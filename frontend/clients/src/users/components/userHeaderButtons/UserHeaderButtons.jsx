import React from 'react';
import { Link } from 'react-router-dom';
import styled from './style.module.css';

const UserHeaderButtons = () => {
  return (
    <div>
      <ul className={styled.header_btns}>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to="/block-members">
            Block Members
          </Link>
        </li>
        <li>
          <Link to='/fqa'>FQA</Link>
        </li>
        <li>
          <Link to='/contact-support'>Contact Support</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserHeaderButtons;
