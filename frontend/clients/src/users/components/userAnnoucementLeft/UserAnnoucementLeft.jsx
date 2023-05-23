/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from './style.module.css';
import UserP from '../../../assets/images/userP.jpg';
import { useConnection } from '../../../socket/SocketConnection';
import { Link } from 'react-router-dom';
import UserAnnouncement from '../userAnnoucement/userAnnoucement';
import { useUser } from '../../../providers/useUser';

const UserAnnoucementLeft = (props) => {
  const {
    users,
    getUserChat,
    socket,
    userCount,
    setCurrentSelectedUser,
    currentSelectedUser,
    fetchChats,
  } = useConnection();
  const { user } = useUser()
  const currentUser = user;
  const userChatFetchecRef = useRef(false);

  useEffect(() => {
    const url = window.location.href;
    const regex = /\/userAnnoucements\/\?(.*)/;
    const match = url.match(regex);
    const id = match ? match[1] : '';

    if (id && users?.length > 0) {
      const activeCurrentUser = users?.find((user) => user.id === id && user);
      setCurrentSelectedUser(activeCurrentUser);
      fetchChats(activeCurrentUser?.id);
    }
  }, [userCount, users]);

  useEffect(() => {
    if (userChatFetchecRef.current) return;
    userChatFetchecRef.current = true;
    getUserChat();
    return () => {
      setCurrentSelectedUser(null);
    };
  }, []);

  const handleUser = (user) => {
    setCurrentSelectedUser(user);
    fetchChats(user.id);
    socket.emit('acknowledge', { currentUser: currentUser?.id }, { currentSelectedUser: user?.id });
  };

  return (
    <Fragment>
      <div className={styled.userAnnoucementChat}>
        {users?.length > 0 ? (
          <div className={styled.userAnnoucementChatLeft}>
            <ul>
              {users?.map((user) => (
                <li key={user.id} onClick={() => handleUser(user)}>
                  {userCount?.length > 0 &&
                    userCount.map((thisUser) => {
                      if (thisUser.userId === user.id && user.id !== currentSelectedUser?.id)
                        return <span className={styled.countNumber}>{thisUser.count}</span>;
                    })}
                  <Link to={`/userAnnoucements/?${user?.id}`}>
                    <div className={styled.farv_img}>
                      <img src={UserP} alt='' />
                    </div>
                    <div className={styled.farvHeadDate}>
                      <div className={styled.farvHeadDate1}>
                        <div className={styled.farv_contl}>
                          <h3>{user.userName}</h3>
                        </div>
                        <div className={styled.farv_contr}>Dec 9</div>
                        <div className={styled.clear}></div>
                      </div>
                      <div className={styled.farvContent}>{/* <p>{messages?.message}</p> */}</div>
                    </div>
                    <div className={styled.clear}></div>
                  </Link>
                </li>
              ))}{' '}
            </ul>
          </div>
        ) : (
          <div className={styled.userAnnoucementNoMessage}>no message to display</div>
        )}
        {currentSelectedUser && <UserAnnouncement user={currentSelectedUser} />}
        <div className={styled.clear}></div>
      </div>
    </Fragment>
  );
};

export default UserAnnoucementLeft;
