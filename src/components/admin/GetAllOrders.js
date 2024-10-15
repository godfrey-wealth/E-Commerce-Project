

// import React, { useState, useEffect } from 'react';
// import { getAllOrders, updateOrderStatus } from '../../services/shopApi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaShoppingBag, FaRedo, FaEdit, FaCheckCircle, FaTimesCircle, FaBox, FaTimes } from 'react-icons/fa';
// import { Container, Table, Form, Badge, Spinner, Row, Col, Tooltip, OverlayTrigger, Button, Modal } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './GetAllOrders.css';

// const GetAllOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [updatingStatus, setUpdatingStatus] = useState(false);
//   const [showItemsModal, setShowItemsModal] = useState(false);
//   const [expandedOrderId, setExpandedOrderId] = useState(null);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       const role = await getCurrentUserRole(); // Mock function
//       setUserRole(role);
//     };
//     fetchUserRole();
//   }, []);

//   useEffect(() => {
//     if (userRole === 'ADMIN') {
//       fetchOrders();
//     }
//   }, [userRole]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const fetchedOrders = await getAllOrders();
//       setOrders(fetchedOrders);
//       setError('');
//     } catch (error) {
//       setError('Failed to load orders. Please try again later.');
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateStatus = async (orderId, newStatus) => {
//     setUpdatingStatus(true);
//     try {
//       await updateOrderStatus(orderId, newStatus);
//       setOrders(orders.map(order =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       ));
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       setError('Failed to update order status. Please try again.');
//     } finally {
//       setUpdatingStatus(false);
//     }
//   };

//   const getCurrentUserRole = async () => {
//     // Mock function to simulate getting the current user role
//     return 'ADMIN'; // Assume user is an admin
//   };

//   const filteredOrders = orders.filter(order =>
//     (order.id.toString().includes(searchTerm) ||
//       (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase()))) &&
//     (statusFilter === 'all' || order.status === statusFilter)
//   );

//   const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'pending': return 'warning';
//       case 'processing': return 'info';
//       case 'shipped': return 'primary';
//       case 'delivered': return 'success';
//       case 'cancelled': return 'danger';
//       default: return 'secondary';
//     }
//   };

//   const renderTooltip = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//       Only admins can update order status.
//     </Tooltip>
//   );

//   const renderItemsTable = (items) => {
//     if (!items || items.length === 0) {
//       return <p>No items to display for this order.</p>;
//     }

//     return (
//       <Table hover striped bordered responsive className="items-table">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <motion.tr
//               key={item.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               transition={{ duration: 0.2, delay: index * 0.1 }}
//             >
//               <td>
//                 <img src={item.productImage} alt={item.productName} className="order-item-image" />
//               </td>
//               <td>{item.productName}</td>
//               <td>${item.price.toFixed(2)}</td>
//               <td>{item.quantity}</td>
//               <td>${(item.price * item.quantity).toFixed(2)}</td>
//             </motion.tr>
//           ))}
//         </tbody>
//       </Table>
//     );
//   };

//   const renderItemsModal = () => (
//     <Modal
//       show={showItemsModal}
//       onHide={() => setShowItemsModal(false)}
//       size="lg"
//       centered
//       className="items-modal"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>
//           <FaBox className="me-2" />
//           Order Items (Order ID: {selectedOrder?.id})
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <AnimatePresence>
//           {selectedOrder?.items ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               {renderItemsTable(selectedOrder.items)}
//               <div className="order-summary">
//                 <h4>Order Summary</h4>
//                 <p><strong>Total Items:</strong> {selectedOrder.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
//                 <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
//               </div>
//             </motion.div>
//           ) : (
//             <p>No items to display for this order.</p>
//           )}
//         </AnimatePresence>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowItemsModal(false)}>
//           <FaTimes className="me-2" />
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   const renderOrdersTable = () => (
//     <motion.div className="table-responsive" layout>
//       <Table hover striped bordered responsive className="orders-table">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Discount Amount</th>
//             <th>Total Amount</th>
//             <th>Date</th>
//             <th>Status</th>
//             {userRole === 'ADMIN' && <th>Update Status</th>}
//             {userRole === 'ADMIN' && <th>View Items</th>}
//           </tr>
//         </thead>
//         <tbody>
//           <AnimatePresence>
//             {filteredOrders.map(order => (
//               <React.Fragment key={order.id}>
//                 <motion.tr
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <td>{order.id}</td>
//                   <td>{order.discountAmount}</td>
//                   <td>${order.totalAmount.toFixed(2)}</td>
//                   <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                   <td>
//                     <Badge bg={getStatusColor(order.status)}>{order.status}</Badge>
//                   </td>
//                   {userRole === 'ADMIN' && (
//                     <td>
//                       {updatingStatus ? (
//                         <Spinner animation="border" size="sm" />
//                       ) : (
//                         <OverlayTrigger placement="top" overlay={renderTooltip}>
//                           <Form.Select
//                             size="sm"
//                             value={order.status}
//                             onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
//                           >
//                             {orderStatuses.map(status => (
//                               <option key={status} value={status}>{status}</option>
//                             ))}
//                           </Form.Select>
//                         </OverlayTrigger>
//                       )}
//                     </td>
//                   )}
//                   {userRole === 'ADMIN' && (
//                     <td>
//                       <Button 
//                         variant="outline-primary" 
//                         size="sm"
//                         onClick={() => {
//                           setSelectedOrder(order);
//                           setShowItemsModal(true);
//                         }}
//                       >
//                         <FaBox className="me-1" /> View Items
//                       </Button>
//                     </td>
//                   )}
//                 </motion.tr>
//                 {expandedOrderId === order.id && (
//                   <motion.tr
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <td colSpan="7">
//                       {renderItemsTable(order.items)}
//                     </td>
//                   </motion.tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </AnimatePresence>
//         </tbody>
//       </Table>
//     </motion.div>
//   );

//   if (!userRole) {
//     return <p>Loading...</p>;
//   }

//   if (userRole !== 'ADMIN') {
//     return <p>You are not authorized to view this page. Please log in as an admin.</p>;
//   }

//   return (
//     <Container fluid className="order-container">
//       <motion.h1 className="order-title" layoutId="page-title">
//         <FaShoppingBag /> Manage All Orders
//       </motion.h1>

//       <Form className="mb-4">
//         <Row>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 type="text"
//                 placeholder="Search by Order ID or Customer Name"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </Form.Group>
//           </Col>
//           <Col xs={12} md={6}>
//             <Form.Group>
//               <Form.Select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="all">All Statuses</option>
//                 {orderStatuses.map(status => (
//                   <option key={status} value={status}>{status}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>
//       </Form>

//       {loading ? (
//         <motion.div className="loader" animate={{ rotate: 360 }} transition={{ loop: Infinity, duration: 1 }}>
//           <FaRedo />
//         </motion.div>
//       ) : error ? (
//         <motion.div className="error-message" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
//           <p>{error}</p>
//           <motion.button
//             onClick={fetchOrders}
//             className="retry-button"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <FaRedo /> Retry
//           </motion.button>
//         </motion.div>
//       ) : (
//         <AnimatePresence>
//           {filteredOrders.length ? renderOrdersTable() : <p>No orders found</p>}
//         </AnimatePresence>
//       )}

//       {renderItemsModal()}
//     </Container>
//   );
// };

// export default GetAllOrders;



// new code

import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/shopApi';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingBag, FaRedo, FaEdit, FaCheckCircle, FaTimesCircle, FaBox, FaTimes, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Container, Table, Form, Badge, Spinner, Row, Col, Tooltip, OverlayTrigger, Button, Card } from 'react-bootstrap';
import './GetAllOrders.css';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'warning';
    case 'processing': return 'info';
    case 'shipped': return 'primary';
    case 'delivered': return 'success';
    case 'cancelled': return 'danger';
    default: return 'secondary';
  }
};

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userRole, setUserRole] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      // In a real application, you would get the user role from your authentication system
      const role = 'ADMIN'; // For demonstration purposes
      setUserRole(role);
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    if (userRole === 'ADMIN') {
      fetchOrders();
    }
  }, [userRole]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await getAllOrders();
      setOrders(fetchedOrders);
      setError('');
    } catch (error) {
      setError('Failed to load orders. Please try again later.');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingStatus(true);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status. Please try again.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filteredOrders = orders.filter(order =>
    (order.id.toString().includes(searchTerm) ||
      (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (statusFilter === 'all' || order.status === statusFilter)
  );

  const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Only admins can update order status.
    </Tooltip>
  );

  const renderOrderItems = (items) => (
    <Table hover responsive className="order-items-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <td>
                <img src={item.productImage} alt={item.productName} className="order-item-image" />
              </td>
              <td>{item.productName}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </motion.tr>
          ))}
        </AnimatePresence>
      </tbody>
    </Table>
  );

  const renderOrdersTable = () => (
    <motion.div className="table-responsive" layout>
      <Table hover striped bordered responsive className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Status</th>
            {userRole === 'ADMIN' && <th>Update Status</th>}
            {userRole === 'ADMIN' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {filteredOrders.map(order => (
              <React.Fragment key={order.id}>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={getStatusColor(order.status)}>{order.status}</Badge>
                  </td>
                  {userRole === 'ADMIN' && (
                    <td>
                      {updatingStatus ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <OverlayTrigger placement="top" overlay={renderTooltip}>
                          <Form.Select
                            size="sm"
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          >
                            {orderStatuses.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </Form.Select>
                        </OverlayTrigger>
                      )}
                    </td>
                  )}
                  {userRole === 'ADMIN' && (
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                      >
                        {expandedOrderId === order.id ? <FaAngleUp /> : <FaAngleDown />} {' '}
                        {expandedOrderId === order.id ? 'Hide' : 'View'} Details
                      </Button>
                    </td>
                  )}
                </motion.tr>
                {expandedOrderId === order.id && (
                  <motion.tr>
                    <td colSpan={userRole === 'ADMIN' ? '7' : '5'}>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card>
                          <Card.Body>
                            <h5>Order Details</h5>
                            <p><strong>Customer:</strong> {order.customerName}</p>
                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            <p><strong>Status:</strong> <Badge bg={getStatusColor(order.status)}>{order.status}</Badge></p>
                            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                            {renderOrderItems(order.orderItems)}
                          </Card.Body>
                        </Card>
                      </motion.div>
                    </td>
                  </motion.tr>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </tbody>
      </Table>
    </motion.div>
  );

  if (!userRole) {
    return <p>Loading...</p>;
  }

  if (userRole !== 'ADMIN') {
    return <p>You are not authorized to view this page. Please log in as an admin.</p>;
  }

  return (
    <Container fluid className="order-container">
      <motion.h1 className="order-title" layoutId="page-title">
        <FaShoppingBag /> Manage All Orders
      </motion.h1>

      <Form className="mb-4">
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by Order ID or Customer Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                {orderStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <motion.div className="loader" animate={{ rotate: 360 }} transition={{ loop: Infinity, duration: 1 }}>
          <FaRedo />
        </motion.div>
      ) : error ? (
        <motion.div className="error-message" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <p>{error}</p>
          <motion.button
            onClick={fetchOrders}
            className="retry-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRedo /> Retry
          </motion.button>
        </motion.div>
      ) : (
        <AnimatePresence>
          {filteredOrders.length ? renderOrdersTable() : <p>No orders found</p>}
        </AnimatePresence>
      )}
    </Container>
  );
};

export default GetAllOrders;