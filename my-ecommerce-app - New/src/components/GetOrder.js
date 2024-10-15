

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserOrders, getAllOrders } from '../services/shopApi';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingBag, FaRedo, FaArrowLeft } from 'react-icons/fa';
import './GetOrder.css';

const GetOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Check if user is Admin
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        let fetchedOrders;
        if (isAdmin) {
          fetchedOrders = await getAllOrders();
        } else {
          fetchedOrders = await getUserOrders(userId);
        }
        setOrders(fetchedOrders);
        setError('');
      } catch (error) {
        setError('Failed to load orders. Please try again later.');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAdmin]);

  const renderOrderItems = (items) => (
    <motion.table className="order-items-table" layout>
      <thead>
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <motion.tr
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <td>
              <img src={item.productImage} alt={item.productName} className="order-item-image" />
            </td>
            <td>{item.productName}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.quantity}</td>
          </motion.tr>
        ))}
      </tbody>
    </motion.table>
  );

  const renderOrders = () => (
    <motion.div className="orders-grid" layout>
      {orders.map((order) => (
        <motion.div
          key={order.id}
          className={`order-card ${selectedOrder === order.id ? 'selected' : ''}`}
          layoutId={`order-${order.id}`}
          onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
        >
          <h3>Order #{order.id}</h3>
          <p>Total: ${order.totalAmount.toFixed(2)}</p>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <AnimatePresence>
            {selectedOrder === order.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p>Discount: ${order.discountAmount.toFixed(2)}</p>
                <p>Status: {order.paymentStatus}</p>
                {renderOrderItems(order.orderItems)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <motion.div
      className="order-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1 className="order-title" layoutId="page-title">
        <FaShoppingBag /> Your Orders
      </motion.h1>

      {loading ? (
        <motion.div className="loader" animate={{ rotate: 360 }} transition={{ loop: Infinity, duration: 1 }}>
          <FaRedo />
        </motion.div>
      ) : error ? (
        <motion.div className="error-message" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <p>{error}</p>
          <motion.button
            onClick={() => window.location.reload()}
            className="retry-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRedo /> Retry
          </motion.button>
        </motion.div>
      ) : (
        <AnimatePresence>
          {orders.length ? renderOrders() : <p>No orders found</p>}
        </AnimatePresence>
      )}

      <motion.button
        className="back-button"
        onClick={() => navigate('/shop')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft /> Back to Shop
      </motion.button>
    </motion.div>
  );
};

export default GetOrder;
