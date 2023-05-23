import React from 'react';
import styled from './style.module.css';

const SettingTabManageAccount = () => {
  return (
    <div className={styled.manageForm}>
      <div className={styled.left_nav}>
        <div className={styled.group_form}>
          <label>User name</label>
          <input type='text' name='name' value='harrybrock10' />
        </div>
        <div className={styled.group_form}>
          <label>Your e-mail address</label>
          <input type='email' name='email' value='harisbt10116e@gmail.com' />
          <span className={styled.verified_email}></span>
        </div>
        <div className={styled.group_form}>
          <label>Birth date</label>
          <input type='date' name='name' value='2004-12-07' />
        </div>
        <div className={styled.group_form}>
          <label>Postal code</label>
          <input type='text' name='name' value='DE, 91183, bayern' />
        </div>
      </div>
      <div className={styled.right_nav}>
        <div className={styled.group_form}>
          <label>Current Password</label>
          <input type='pwd' name='name' placeholder='Current Passowrd' />
        </div>
        <div className={styled.group_form}>
          <input type='pwd' name='name' placeholder='New Passowrd' />
        </div>
        <div className={styled.group_form}>
          <input type='pwd' name='name' placeholder='Confirm Passowrd' />
        </div>
        <div className={styled.group_form}>
          <input type='submit' name='submit' value='submit' />
        </div>
      </div>
    </div>
  );
};
export default SettingTabManageAccount;
