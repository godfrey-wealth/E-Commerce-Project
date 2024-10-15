
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUserCart, addToCart, updateCartItem, removeFromCart } from '../services/shopApi';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchCart = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getUserCart();
//       setCartItems(response);
//     } catch (error) {
//       console.error('Failed to fetch cart:', error);
//       setError('Failed to load cart. Please try again.');
//       if (error.response && error.response.status === 401) {
//         navigate('/login');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const addOneToCart = async (productId) => {
//     try {
//       await addToCart(productId, 1);
//       await fetchCart();
//     } catch (error) {
//       console.error('Failed to add item to cart:', error);
//       setError('Failed to add item to cart. Please try again.');
//     }
//   };

//   const removeOneFromCart = async (productId) => {
//     const item = cartItems.find(item => item.productId === productId);
//     if (item) {
//       try {
//         if (item.quantity === 1) {
//           await removeFromCart(item.id);
//         } else {
//           await updateCartItem(item.id, item.quantity - 1);
//         }
//         await fetchCart();
//       } catch (error) {
//         console.error('Failed to remove item from cart:', error);
//         setError('Failed to remove item from cart. Please try again.');
//       }
//     }
//   };

//   const deleteFromCart = async (productId) => {
//     const item = cartItems.find(item => item.productId === productId);
//     if (item) {
//       try {
//         await removeFromCart(item.id);
//         await fetchCart();
//       } catch (error) {
//         console.error('Failed to delete item from cart:', error);
//         setError('Failed to delete item from cart. Please try again.');
//       }
//     }
//   };

//   const getProductQuantity = (productId) => {
//     const item = cartItems.find(item => item.productId === productId);
//     return item ? item.quantity : 0;
//   };

//   const getTotalCost = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         items: cartItems,
//         loading,
//         error,
//         addOneToCart,
//         removeOneFromCart,
//         deleteFromCart,
//         getProductQuantity,
//         getTotalCost,
//         fetchCart
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


// updated code

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCart, addToCart, updateCartItem, removeFromCart } from '../services/shopApi';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserCart();
      setCartItems(response);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setError('Failed to load cart. Please try again.');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addOneToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      await fetchCart();
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      setError('Failed to add item to cart. Please try again.');
    }
  };

  const removeOneFromCart = async (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item) {
      try {
        if (item.quantity === 1) {
          await removeFromCart(item.id);
        } else {
          await updateCartItem(item.id, item.quantity - 1);
        }
        await fetchCart();
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
        setError('Failed to remove item from cart. Please try again.');
      }
    }
  };

  const deleteFromCart = async (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item) {
      try {
        await removeFromCart(item.id);
        await fetchCart();
      } catch (error) {
        console.error('Failed to delete item from cart:', error);
        setError('Failed to delete item from cart. Please try again.');
      }
    }
  };

  const getProductQuantity = useCallback((productId) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  const getTotalCost = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const getTotalQuantity = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        loading,
        error,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getProductQuantity,
        getTotalCost,
        getTotalQuantity,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};