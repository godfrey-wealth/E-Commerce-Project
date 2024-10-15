
import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // For decoding JWT tokens

import { getUserProfile } from '../../services/api';// Replace with actual API endpoint

const AdminPage = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for spinner
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    if (!authToken || !role) {
      setError('You are not authenticated. Please log in.');
      setLoading(false); // Stop loading if not authenticated
      return;
    }

    const decodedToken = jwtDecode(authToken); // Decode token to validate
    if (!decodedToken) {
      setError('Invalid authentication token.');
      setLoading(false); // Stop loading if token invalid
      return;
    }

    axios.get(getUserProfile(), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(response => {
      setUser(response.data);
      setAuth(true);
      setLoading(false); // Stop loading once user is fetched
    })
    .catch(error => {
      setLoading(false); // Stop loading on error
      if (error.response && error.response.status === 401) {
        setError('You are not authenticated. Please log in.');
      } else {
        setError('An error occurred while fetching user profile.');
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    setAuth(false);
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="mt-5">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="danger">{error}</Alert>
          </motion.div>
        )}

        {auth && user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="mb-4">Welcome, {user.firstname}!</h3>
            <p>Your role: <strong>{user.role}</strong></p>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </motion.div>
        )}

        {!auth && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3>Please Log In</h3>
            <Link to="/login">
              <Button variant="primary" className="mt-3">Login</Button>
            </Link>
          </motion.div>
        )}
      </Container>
    </motion.div>
  );
};

export default AdminPage;
