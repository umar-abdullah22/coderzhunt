/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable-next-line no-unused-vars*/
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { fetchChat, fetchChatusers } from '../store/slices/announcementChat/actions';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useUser } from '../providers/useUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const SOCKET_URL = process.env.SOCKET_IO_URL || 'https://coderzhunt-backend-zizle.vercel.app';

const ConnectionContext = createContext();

export const ConnectionProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [moderatorIds, setModeratorIds] = useState([]);
  const [users, setUsers] = useState();
  const [currentSelectedUser, setCurrentSelectedUser] = useState(null);
  const [pingIntervalId, setPingIntervalId] = useState(null);
  const { token: accessToken } = useUser();
  const [userCount, setUserCount] = useState();

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userCounts = {};
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const connectSocket = (accessToken) => {
    const newSocket = io(
      // SOCKET_URL, { transports: ['websocket'], query: { token: accessToken } }
    );
    setSocket(newSocket);
    return newSocket;
  };

  useEffect(() => {
    if (accessToken) {
      const newSocket = connectSocket(accessToken);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [accessToken]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', handleConnect);
      socket.on('pong', handlePong);
      socket.on('disconnect', handleDisconnect);

      socket?.on('sendMessage', (data) => {
        if(`successful` in data && !data.successful){
          toast.error('Message Sending Failed', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setMessages((msgs) => [...msgs, data]);
          navigate(`./userAnnoucements/?${data.receiver}`);
        }
      });

      socket.on('receiveMessage', (data) => {
        socket.emit('unseenMessageCount', {userId:data.receiver});
        getUserChat();
        setMessages((msgs) => [...msgs, data]);
      });

      socket.on('getUnseenMessageCountNotification', (data) => {
        setUserCount(data);
      });
      socket.on('acknowledgementFromServer', (data) => {
        setUserCount(data);
      });

      return () => {
        socket.off('connect', handleConnect);
        socket.off('pong', handlePong);
        socket.off('disconnect', handleDisconnect);
        socket.off('sendMessage');
        socket.off('receiveMessage');
        socket.off('acknowledgementFromServer');
        socket.off('getUnseenMessageCountNotification');
      };
    }
  }, [socket]);

  const handleConnect = () => {
    setTimeout(() => {
      socket.emit('unseenMessageCount', {userId:currentUser?.id});
    }, 100);
    const newPingIntervalId = setInterval(() => {
      socket.emit('ping');
    }, 5000);
    setPingIntervalId(newPingIntervalId);
    socket.emit('fake', currentUser?.id);
  };

  const handlePong = () => {
  };

  const handleDisconnect = () => {
    clearInterval(pingIntervalId);
  };

  const fetchChats = (id) => {
    dispatch(fetchChat(id))
      .then(unwrapResult)
      .then((result) => {
        setMessages(result?.chats)
        setModeratorIds(result.moderatorIds)
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    socket?.emit('logoutNotification', currentUser?.id)
    socket?.emit('acknowledge', { currentUser:currentUser?.id }, { currentSelectedUser:currentSelectedUser?.id })

    return () => {
      socket?.off('acknowledge');
      setMessages([]);
      setModeratorIds([])
    };
  }, [currentSelectedUser]);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('sendMessage', message);
    }
  };

  const getUserChat = () => {
    //fetch user chat
    dispatch(fetchChatusers())
      .then(unwrapResult)
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => {});
  };

  const value = {
    socket,
    setSocket,
    sendMessage,
    messages,
    setMessages,
    getUserChat,
    fetchChats,
    users,
    setUsers,
    setCurrentSelectedUser,
    currentSelectedUser,
    userCounts,
    userCount,
    setUserCount,
    moderatorIds
  };

  return (
    <>
      <ConnectionContext.Provider value={value} {...props} />
    </>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
};
