

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, Form, InputGroup, Button, Pagination, Spinner, Modal } from 'react-bootstrap';
import { FaSearch, FaSort, FaEdit, FaTrash, FaUserShield, FaUser, FaExclamationTriangle } from 'react-icons/fa';
import { getAllUsers, deleteUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../services/auth';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetchUsers = async () => {
      if (!isAuthenticated()) {
        navigate('/login');
        return;
      }

    //   const userRole = getUserRole();
    //   if (userRole == 'ADMIN') {
    //     navigate('/users');
    //     //navigate('/unauthorized');
    //     return;
    //   }

      fetchUsers();
    };

    checkAuthAndFetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const results = users.filter(user =>
      Object.values(user).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(column);

    setFilteredUsers(prev => 
      [...prev].sort((a, b) => {
        if (a[column] < b[column]) return isAsc ? -1 : 1;
        if (a[column] > b[column]) return isAsc ? 1 : -1;
        return 0;
      })
    );
  };

  const handleEdit = (userId) => {
    // Implement edit functionality
    console.log('Edit user:', userId);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mt-5"
    >
      <h2 className="text-center mb-4">All Users</h2>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="alert alert-danger"
        >
          {error}
        </motion.div>
      )}

      <Form className="mb-4">
        <InputGroup>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Form>

      <motion.div
        variants={tableVariants}
        initial="hidden"
        animate="visible"
        className="table-responsive"
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              {['id', 'username', 'email', 'role'].map((column) => (
                <th key={column} onClick={() => handleSort(column)} style={{ cursor: 'pointer' }}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {sortColumn === column && (
                    <FaSort className={`ms-2 ${sortDirection === 'asc' ? 'text-primary' : 'text-secondary'}`} />
                  )}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {currentUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 'ADMIN' ? (
                      <FaUserShield className="text-primary" />
                    ) : (
                      <FaUser className="text-secondary" />
                    )}
                    {' '}{user.userRoles.map(role => role.name).join(', ')}
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(user.id)} className="me-2">
                      <FaEdit /> Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(user)}>
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </Table>
      </motion.div>

      <Pagination className="justify-content-center mt-4">
        {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FaExclamationTriangle className="text-warning me-2" />
          Are you sure you want to delete the user: {userToDelete?.username}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default AllUsers;