import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoutes = (props) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to={props.redirectLink} replace />;
  }
  return props.children;
};
export default AuthRoutes;
