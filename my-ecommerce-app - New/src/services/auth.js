
// src/services/auth.js

import { loginApi } from './api';

export const login = async (username, password) => {
  try {
    const response = await loginApi(username, password);
    if (response && response.data) {
      const userData = response.data;
      localStorage.setItem('token', userData.accessToken);
      localStorage.setItem('refreshToken', userData.refreshToken);
      localStorage.setItem('userId', userData.userId);
      localStorage.setItem('userRole', userData.userRoles && userData.userRoles.length > 0 ? userData.userRoles[0].name : 'CUSTOMER');
      localStorage.setItem('userData', JSON.stringify(userData));
      return userData;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || error.message || 'An error occurred during login';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userData');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getUserRole = () => {
  return localStorage.getItem('userRole') || null;
};

export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const updateUserData = (newUserData) => {
  localStorage.setItem('userData', JSON.stringify(newUserData));
};

export const updateToken = (newToken) => {
  localStorage.setItem('token', newToken);
};

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};


//New Code

