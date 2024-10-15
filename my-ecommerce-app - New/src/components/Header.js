






//new code version

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { logout, isAuthenticated, getUserRole, getUserData, getToken } from '../services/auth';
import { Navbar, Nav, Container, Badge, Dropdown, Image } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaClipboardList, FaUsers, FaBoxes, FaStore } from 'react-icons/fa';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Fix: Import the default function without destructuring

const USER_PROFILE_ENDPOINT = 'http://localhost:8080/api/users/profile';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchUserData = useCallback(async (authToken) => {
    try {
      const response = await axios.get(USER_PROFILE_ENDPOINT, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUserData(response.data);
      setRole(response.data.userRoles[0].name);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred while fetching user profile.');
    }
  }, []);

  // Authentication and Cart Calculation
  useEffect(() => {
    const authToken = getToken();
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);

    if (loggedIn && authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        const userRole = decodedToken.role || getUserRole();
        setRole(userRole);
        fetchUserData(authToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        setError('Invalid authentication token.');
        handleLogout(); // Automatically log out on token error
      }
    }

    // Calculate cart items
    const calculateCartItemCount = () => {
      if (items && Array.isArray(items)) {
        const count = items.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(count);
      } else {
        setCartItemCount(0);
      }
    };

    calculateCartItemCount();
  }, [items, location, fetchUserData]);

  // Role-based navigation for admins
  // useEffect(() => {
  //   if (isLoggedIn && role === 'ADMIN' && !location.pathname.startsWith('/admin')) {
  //     navigate('/admin');

  //   }

  // }, [isLoggedIn, role, location.pathname, navigate]);

  // Logout Functionality
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setRole(null);
    setUserData(null);
    navigate('/login');
  };

  const navAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" expanded={expanded} sticky="top">
      <Container>
        <Navbar.Brand as={Link} to={role === 'ADMIN' ? '/getorders' : '/'}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            {role === 'ADMIN' ? 'Admin Dashboard' : 'E-Commerce'}
          </motion.div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <AnimatePresence>
              {!isLoggedIn && (
                <>
                  <motion.div variants={navAnimation} initial="hidden" animate="visible" exit="hidden">
                    <Nav.Link as={Link} to="/products" onClick={() => setExpanded(false)}>
                      <FaStore className="me-1" /> Products
                    </Nav.Link>
                  </motion.div>
                  <motion.div variants={navAnimation} initial="hidden" animate="visible" exit="hidden">
                    <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>
                      <FaSignInAlt className="me-1" /> Login
                    </Nav.Link>
                  </motion.div>
                  <motion.div variants={navAnimation} initial="hidden" animate="visible" exit="hidden">
                    <Nav.Link as={Link} to="/register" onClick={() => setExpanded(false)}>
                      <FaUserPlus className="me-1" /> Register
                    </Nav.Link>
                  </motion.div>
                </>
              )}

              {isLoggedIn && role === 'ADMIN' && (
                <>
                  <motion.div variants={navAnimation} initial="hidden" animate="visible" exit="hidden">
                    <Nav.Link as={Link} to="/getorders" onClick={() => setExpanded(false)}>
                      <FaClipboardList className="me-1" /> All Orders
                    </Nav.Link>
                  </motion.div>
                  <motion.div variants={navAnimation} initial="hidden" animate="visible" exit="hidden">
                    <Nav.Link as={Link} to="/users" onClick={() => setExpanded(false)}>
                      <FaUsers className="me-1" /> All Users
                    </Nav.Link>
                  </motion.div>
                  <motion.div variants={navAnimation} initial="hidden" animate="visible" exit="hidden">
                    <Nav.Link as={Link} to="/product" onClick={() => setExpanded(false)}>
                      <FaBoxes className="me-1" /> Manage Products
                    </Nav.Link>
                  </motion.div>
                </>
              )}

              {isLoggedIn && role === 'CUSTOMER' && (
                <>
                  <motion.div variants={navAnimation} initial="hidden" animate="visible" exit="hidden">
                    <Nav.Link as={Link} to="/products" onClick={() => setExpanded(false)}>
                      <FaStore className="me-1" /> Products
                    </Nav.Link>
                  </motion.div>
                  <motion.div variants={navAnimation} initial="hidden" animate="visible" exit="hidden">
                    <Nav.Link as={Link} to="/cart" onClick={() => setExpanded(false)}>
                      <FaShoppingCart className="me-1" />
                      Cart
                      {cartItemCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          <Badge bg="danger" pill className="ms-1">
                            {cartItemCount}
                          </Badge>
                        </motion.span>
                      )}
                    </Nav.Link>
                  </motion.div>
                  <motion.div variants={navAnimation} initial="hidden" animate="visible" exit="hidden">
                    <Nav.Link as={Link} to="/orders" onClick={() => setExpanded(false)}>
                      <FaClipboardList className="me-1" /> My Orders
                    </Nav.Link>
                  </motion.div>
                 
                </>
              )}
            </AnimatePresence>

            {isLoggedIn && userData && (
              <Dropdown align="end">
                <Dropdown.Toggle as={Nav.Link}>
                  {userData.userImages && (
                    <Image src={userData.userImages} roundedCircle width="30" height="30" className="me-2" />
                  )}
                  {userData.firstname || 'Account'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={role === 'ADMIN' ? '/adminprofile' : '/profile'}>Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
