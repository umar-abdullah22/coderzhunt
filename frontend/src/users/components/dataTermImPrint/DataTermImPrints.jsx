import React from 'react';
import styled from './style.module.css';
import { Link } from 'react-router-dom';

const DataTermImPrints = () => {
  return (
    <>
      <div className={styled.mainDiv}>
        <div className={styled.innerdiv}>
          <div className={styled.logoSec}>
            <Link to='/'>
              <img src='../../assets/images/logo_main.jpg' alt='logo_image' />
            </Link>
          </div>
          <div className={styled.homeLink}>
            <Link to='/'>Home page</Link>
          </div>
          <div className={styled.clear}></div>

          <ul>
            <li>
              <Link to='/user/data-protection'>Data Protection</Link>
            </li>
            <li>
              <Link to='/user/term-of-use'>Term of use</Link>
            </li>
            <li>
              <Link to='/user/imprint'>Imprint</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DataTermImPrints;
