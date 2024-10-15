

// import React, { useEffect, useState } from 'react';
// import { useCart } from '../contexts/CartContext';
// import { Card, Button, ListGroup, Spinner, Alert, Row, Col, Form, Container } from 'react-bootstrap';
// import { motion, AnimatePresence } from 'framer-motion';
// import styled from 'styled-components';
// import { FaCreditCard, FaShoppingCart } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { createOrder } from '../services/shopApi';

// const AnimatedCard = styled(motion.div)`
//   margin-bottom: 1rem;
// `;

// const Checkout = () => {
//   const { items, getTotalCost, clearCart } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [discountCode, setDiscountCode] = useState('');
//   const navigate = useNavigate();

//   //const totalAmount = getTotalCost();

//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     //setTotalAmount(getTotalCost());
//     calculateTotal(items);
//   }, [items, getTotalCost]);

//   const calculateTotal = (cartItems) => {
//         const total = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
//         setTotalAmount(total);
//       };
 
  

//   const handleCreateOrder = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const orderData = {
//         userId: localStorage.getItem('userId'),
//         discountCode,
//         items: items.map(item => ({
//           productId: item.productId,
//           quantity: item.quantity
//         }))
//       };
//       await createOrder(orderData);
//       clearCart();
//       navigate('/order-confirmation');
//     } catch (err) {
//       setError('Failed to create order. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <AnimatedCard
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 50 }}
//       >
//         <Card>
//           <Card.Header>
//             <h2><FaShoppingCart /> Checkout</h2>
//           </Card.Header>
//           <ListGroup variant="flush">
//             <AnimatePresence>
//               {items.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <ListGroup.Item>
//                     <Row className="align-items-center">
//                       <Col xs={3} md={2}>
//                         {item.image && (
//                           <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto' }} />
//                         )}
//                       </Col>
//                       <Col xs={9} md={10}>
//                         <h5>{item.name || 'Unnamed Product'}</h5>
//                         <p>Price: ${(item.itemTotal / item.quantity).toFixed(2)}</p>
//                         <p>Quantity: {item.quantity}</p>
//                         <p>Item Total: ${item.itemTotal.toFixed(2)}</p>
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </ListGroup>
//           <Card.Body>
//             <Form onSubmit={handleCreateOrder}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Discount Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter discount code"
//                   value={discountCode}
//                   onChange={(e) => setDiscountCode(e.target.value)}
//                 />
//               </Form.Group>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Button variant="primary" type="submit" disabled={loading}>
//                 {loading ? (
//                   <Spinner animation="border" size="sm" />
//                 ) : (
//                   <>
//                     <FaCreditCard className="me-2" />
//                     Place Order (${totalAmount.toFixed(2)})
//                   </>
//                 )}
//               </Button>
//             </Form>
//           </Card.Body>
//           <Card.Footer>
//             <strong>Total: ${totalAmount.toFixed(2)}</strong>
//           </Card.Footer>
//         </Card>
//       </AnimatedCard>
//     </Container>
//   );
// };

// export default Checkout;

// updated code




// Checkout.js

import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AnimatedCard = styled(motion.div)`
  margin-bottom: 1rem;
`;

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <AnimatedCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <Card>
          <Card.Body className="text-center">
            <FaCheckCircle size={64} color="green" className="mb-3" />
            <Card.Title>Order Confirmed!</Card.Title>
            <Card.Text>Thank you for your purchase. Your order has been successfully placed.</Card.Text>
            <Button variant="primary" onClick={() => navigate('/products')}>
              <FaArrowLeft className="me-2" />
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      </AnimatedCard>
    </Container>
  );
};

export default Checkout;