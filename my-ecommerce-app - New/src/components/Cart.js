

// import React, { useEffect, useState } from 'react';
// import { useCart } from '../contexts/CartContext';
// import { Card, Button, ListGroup, Spinner, Alert, Row, Col, Form, Container } from 'react-bootstrap';
// import { motion, AnimatePresence } from 'framer-motion';
// import styled from 'styled-components';
// import { getUserCart, addToCart, updateCartItem, removeFromCart } from '../services/shopApi';

// const AnimatedCard = styled(motion.div)`
//   margin-bottom: 1rem;
// `;

// const Cart = () => {
//   const { updateItems } = useCart();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     const fetchCart = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getUserCart();
//         setItems(response);
//         if (updateItems) updateItems(response);
//         calculateTotal(response);
//       } catch (err) {
//         console.error('Error fetching cart:', err);
//         setError('Failed to load cart. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [updateItems]);

//   const calculateTotal = (cartItems) => {
//     const total = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
//     setTotalAmount(total);
//   };

//   const handleAddOne = async (itemId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await addToCart(itemId, 1);
//       const updatedCart = await getUserCart();
//       setItems(updatedCart);
//       if (updateItems) updateItems(updatedCart);
//       calculateTotal(updatedCart);
//     } catch (error) {
//       console.error('Error adding item:', error);
//       setError('Failed to add item. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveOne = async (itemId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await updateCartItem(itemId, -1);
//       const updatedCart = await getUserCart();
//       setItems(updatedCart);
//       if (updateItems) updateItems(updatedCart);
//       calculateTotal(updatedCart);
//     } catch (error) {
//       console.error('Error removing item:', error);
//       setError('Failed to remove item. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (itemId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await removeFromCart(itemId);
//       const updatedCart = await getUserCart();
//       setItems(updatedCart);
//       if (updateItems) updateItems(updatedCart);
//       calculateTotal(updatedCart);
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       setError('Failed to delete item. Please try again.');
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

//   if (error) {
//     return (
//       <Container>
//         <Alert variant="danger" className="mt-3">
//           {error}
//         </Alert>
//       </Container>
//     );
//   }

//   if (!items || items.length === 0) {
//     return (
//       <Container>
//         <AnimatedCard
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 50 }}
//         >
//           <Card>
//             <Card.Body>
//               <Card.Text>Your cart is empty.</Card.Text>
//             </Card.Body>
//           </Card>
//         </AnimatedCard>
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
//           <Card.Header>Your Cart</Card.Header>
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
//                         <p>Item Total: ${item.itemTotal.toFixed(2)}</p>
//                         <Form as={Row} className="align-items-center">
//                           <Form.Label column="true" xs="auto">Quantity: {item.quantity || 0}</Form.Label>
//                           <Col xs="auto">
//                             <Button size="sm" onClick={() => handleAddOne(item.id)} className="mx-1">+</Button>
//                             <Button size="sm" onClick={() => handleRemoveOne(item.id)} className="mx-1">-</Button>
//                           </Col>
//                         </Form>
//                         <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)} className="mt-2">
//                           Remove
//                         </Button>
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </ListGroup>
//           <Card.Footer>
//             <strong>Total: ${totalAmount.toFixed(2)}</strong>
//           </Card.Footer>
//         </Card>
//       </AnimatedCard>
//     </Container>
//   );
// };

// export default Cart;



// updated code


import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Card, Button, ListGroup, Spinner, Alert, Row, Col, Form, Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./Cart.css";

const AnimatedCard = styled(motion.div)`
  margin-bottom: 1rem;
`;

const Cart = () => {
  const { items, loading, error, addOneToCart, removeOneFromCart, deleteFromCart, getTotalCost } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    //setTotalAmount(getTotalCost());
    calculateTotal(items);
  }, [items, getTotalCost]);

  const calculateTotal = (cartItems) => {
        const total = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
        setTotalAmount(total);
      };
 

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Container>
        <AnimatedCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <Card>
            <Card.Body>
              <Card.Text>Your cart is empty.</Card.Text>
            </Card.Body>
          </Card>
        </AnimatedCard>
      </Container>
    );
  }

  return (
    <Container>
      <AnimatedCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <Card>
          <Card.Header>Your Cart</Card.Header>
          <ListGroup variant="flush">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        {item.image && (
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto' }} />
                        )}
                      </Col>
                      <Col xs={9} md={10}>
                        <h5>{item.name || 'Unnamed Product'}</h5>
                        <p>Price:${(item.itemTotal / item.quantity).toFixed(2)}</p>
                        <Form as={Row} className="align-items-center">
                          <Form.Label column="true" xs="auto">Quantity: {item.quantity || 0}</Form.Label>
                          <Col xs="auto">
                            <Button size="sm" onClick={() => addOneToCart(item.productId)} className="mx-1">
                              <FaPlus />
                            </Button>
                            <Button size="sm" onClick={() => removeOneFromCart(item.productId)} className="mx-1">
                              <FaMinus />
                            </Button>
                          </Col>
                        </Form>
                        <Button variant="danger" size="sm" onClick={() => deleteFromCart(item.productId)} className="mt-2">
                          <FaTrash /> Remove
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </motion.div>
              ))}
            </AnimatePresence>
          </ListGroup>
          <Card.Footer>
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
          </Card.Footer>
        </Card>
         <Card>
          <Card.Body>
            <Link to="/order" className="btn btn-primary btn-block">
              Continue  Checkout
            </Link>
          </Card.Body>
        </Card> 
        {/* <Link to="/order">
  <Button variant="primary" className="custom-btn mt-3">
    Checkout
  </Button>
</Link> */}

      </AnimatedCard>
    </Container>
  );
};

export default Cart;