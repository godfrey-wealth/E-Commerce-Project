

// src/components/AuthWrapper.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../services/auth';

const AuthWrapper = (WrappedComponent, allowedRoles) => {
  return (props) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }

    const userRole = getUserRole();
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthWrapper;