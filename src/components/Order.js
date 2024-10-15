
// import React, { useState, useEffect, useCallback } from 'react';
// import { useCart } from '../contexts/CartContext';
// import { Card, Button, ListGroup, Spinner, Alert, Row, Col, Form, Container } from 'react-bootstrap';
// import { motion, AnimatePresence } from 'framer-motion';
// import styled from 'styled-components';
// import { FaCreditCard, FaShoppingCart } from 'react-icons/fa';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { createOrder, getUserCart } from '../services/shopApi';
// import { useNavigate } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_51PRhCzIM2T0fBjw5YNMZDVuRXQBc35lhR0SMxoURkRKu0FZb3YIoeVoNBT2oTTTgjvuBxx6HWMULx4Iz92aXei4D00xX7Dna7J');

// const AnimatedCard = styled(motion.div)`
//   margin-bottom: 1rem;
// `;

// const StyledCardElement = styled(CardElement)`
//   border: 1px solid #ced4da;
//   border-radius: 0.25rem;
//   padding: 0.375rem 0.75rem;
// `;

// const Order = () => {
//   const { items, clearCart } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [discountCode, setDiscountCode] = useState('');
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [cartId, setCartId] = useState(null);
//   const navigate = useNavigate();

//   const calculateDiscount = useCallback((code, total) => {
//     if (code === 'DISCOUNT5') {
//       return total * 0.05; // 5% discount
//     }
//     return 0;
//   }, []);

//   const calculateTotal = useCallback((cartItems) => {
//     const total = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
//     setTotalAmount(total);
//     const discount = calculateDiscount(discountCode, total);
//     setDiscountAmount(discount);
//   }, [discountCode, calculateDiscount]);

//   useEffect(() => {
//     if (items.length === 0) {
//       navigate('/cart');
//     }
//     calculateTotal(items);
//     fetchCartId();
//   }, [items, navigate, calculateTotal]);

//   const fetchCartId = async () => {
//     try {
//       const cart = await getUserCart();
//       setCartId(cart.id);
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       setError('Failed to fetch cart information.');
//     }
//   };

//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm
//         items={items}
//         totalAmount={totalAmount}
//         discountAmount={discountAmount}
//         discountCode={discountCode}
//         setDiscountCode={setDiscountCode}
//         clearCart={clearCart}
//         cartId={cartId}
//       />
//     </Elements>
//   );
// };

// const CheckoutForm = ({ items, totalAmount, discountAmount, discountCode, setDiscountCode, clearCart, cartId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);
//     setError(null);

//     if (!stripe || !elements) {
//       setError("Stripe hasn't loaded yet. Please try again.");
//       setProcessing(false);
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//       });

//       if (error) {
//         throw new Error(error.message);
//       }

//       const orderData = {
//         userId: localStorage.getItem('userId'),
//         cartId: cartId,
//         discountCode,
//         paymentMethodId: paymentMethod.id,
//         totalAmount: totalAmount - discountAmount,
//       };

//       const createdOrder = await createOrder(orderData);

//       const { error: confirmError } = await stripe.confirmCardPayment(
//         createdOrder.paymentIntentClientSecret,
//         {
//           payment_method: paymentMethod.id,
//         }
//       );

//       if (confirmError) {
//         throw new Error(confirmError.message);
//       }

//       if (typeof clearCart === 'function') {
//         clearCart();
//       } else {
//         console.warn('clearCart is not a function');
//       }
//       navigate('/checkout-success');
//     } catch (err) {
//       console.error('Error creating order:', err);
//       setError(err.message || 'Failed to create order. Please try again.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <Container>
//       <AnimatedCard
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 50 }}
//       >
//         <Card>
//           <Card.Header>
//             <h2><FaShoppingCart /> Order Summary</h2>
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
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Discount Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter discount code"
//                   value={discountCode}
//                   onChange={(e) => setDiscountCode(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Card Details</Form.Label>
//                 <StyledCardElement />
//               </Form.Group>
//               {error && (
//                 <Alert variant="danger" className="mt-3">
//                   {error}
//                 </Alert>
//               )}
//               <Button variant="primary" type="submit" disabled={!stripe || processing || items.length === 0}>
//                 {processing ? (
//                   <Spinner animation="border" size="sm" />
//                 ) : (
//                   <>
//                     <FaCreditCard className="me-2" />
//                     Pay ${(totalAmount - discountAmount).toFixed(2)}
//                   </>
//                 )}
//               </Button>
//             </Form>
//           </Card.Body>
//           <Card.Footer>
//             <strong>Subtotal: ${totalAmount.toFixed(2)}</strong>
//             {discountAmount > 0 && (
//               <div>
//                 <strong>Discount: -${discountAmount.toFixed(2)}</strong>
//               </div>
//             )}
//             <strong>Total: ${(totalAmount - discountAmount).toFixed(2)}</strong>
//           </Card.Footer>
//         </Card>
//       </AnimatedCard>
//     </Container>
//   );
// };

// export default Order;


// updated code


import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../contexts/CartContext';
import { Card, Button, ListGroup, Spinner, Alert, Row, Col, Form, Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaCreditCard, FaShoppingCart } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createOrder, getUserCart } from '../services/shopApi';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PRhCzIM2T0fBjw5YNMZDVuRXQBc35lhR0SMxoURkRKu0FZb3YIoeVoNBT2oTTTgjvuBxx6HWMULx4Iz92aXei4D00xX7Dna7J');

const AnimatedCard = styled(motion.div)`
  margin-bottom: 1rem;
`;

const StyledCardElement = styled(CardElement)`
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
`;

const Order = () => {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [cartId, setCartId] = useState(null);
  const navigate = useNavigate();

  const calculateTotal = useCallback(() => {
    const total = items.reduce((sum, item) => sum + item.itemTotal, 0);
    setTotalAmount(total);
  }, [items]);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
    calculateTotal();
    fetchCartId();
  }, [items, navigate, calculateTotal]);

  const fetchCartId = async () => {
    try {
      const cart = await getUserCart();
      setCartId(cart.id);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to fetch cart information.');
    }
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        items={items}
        totalAmount={totalAmount}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        clearCart={clearCart}
        cartId={cartId}
      />
    </Elements>
  );
};

const CheckoutForm = ({ items, totalAmount, discountCode, setDiscountCode, clearCart, cartId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe hasn't loaded yet. Please try again.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      const orderData = {
        userId: localStorage.getItem('userId'),
        cartId: cartId,
        discountCode,
        paymentMethodId: paymentMethod.id,
        totalAmount,
      };

      const createdOrder = await createOrder(orderData);

      const { error: confirmError } = await stripe.confirmCardPayment(
        createdOrder.paymentIntentClientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (typeof clearCart === 'function') {
        clearCart();
      } else {
        console.warn('clearCart is not a function');
      }
      navigate('/checkout-success');
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message || 'Failed to create order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container>
      <AnimatedCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <Card>
          <Card.Header>
            <h2><FaShoppingCart /> Order Summary</h2>
          </Card.Header>
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
                        <p>Price: ${(item.itemTotal / item.quantity).toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Item Total: ${item.itemTotal.toFixed(2)}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </motion.div>
              ))}
            </AnimatePresence>
          </ListGroup>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Discount Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                />
                {discountCode && (
  <Form.Text 
    className={
      discountCode === "DISCOUNT5" || 
      discountCode === "DISCOUNT10" || 
      discountCode === "DISCOUNT20" 
        ? "text-success" 
        : "text-danger"
    }
  >
    {
      discountCode === "DISCOUNT5" || 
      discountCode === "DISCOUNT10" || 
      discountCode === "DISCOUNT15" 
        ? "Valid discount code" 
        : "Invalid discount code"
    }
  </Form.Text>
)}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Card Details</Form.Label>
                <StyledCardElement />
              </Form.Group>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              <Button variant="primary" type="submit" disabled={!stripe || processing || items.length === 0}>
                {processing ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <>
                    <FaCreditCard className="me-2" />
                    Pay ${totalAmount.toFixed(2)}
                  </>
                )}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
            {discountCode && (
              <p>Discount Code Applied: {discountCode}</p>
            )}
          </Card.Footer>
        </Card>
      </AnimatedCard>
    </Container>
  );
};

export default Order;