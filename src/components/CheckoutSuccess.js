

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaListAlt } from 'react-icons/fa';

const CheckoutSuccess = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Or you can return a loading spinner
  }

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow">
              <Card.Body className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <FaCheckCircle className="text-success mb-4" size={80} />
                </motion.div>
                <Card.Title as="h2" className="mb-4">Order Placed Successfully!</Card.Title>
                <Card.Text className="mb-4">
                  Thank you for your purchase. Your order has been received and is being processed.
                </Card.Text>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Row className="justify-content-center">
                    <Col xs={6} className="mb-3">
                      <Button
                        as={Link}
                        to="/"
                        variant="outline-primary"
                        className="w-100"
                      >
                        <FaHome className="me-2" />
                        Home
                      </Button>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <Button
                        as={Link}
                        to="/orders"
                        variant="primary"
                        className="w-100"
                      >
                        <FaListAlt className="me-2" />
                        My Orders
                      </Button>
                    </Col>
                  </Row>
                </motion.div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default CheckoutSuccess;