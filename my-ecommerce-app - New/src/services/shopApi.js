

// // import axios from 'axios';

// // const API_URL = 'http://localhost:8080/api';

// // const api = axios.create({
// //   baseURL: API_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //   withCredentials: true, // This is important for CORS with credentials
// // });

// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('token');
// //   if (token) {
// //     config.headers['Authorization'] = `Bearer ${token}`;
// //   }
// //   return config;
// // }, (error) => {
// //   return Promise.reject(error);
// // });

// // api.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     if (error.response && error.response.status === 401) {
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('userId');
// //       window.location.href = '/login';
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // const apiCall = async (method, url, data = null) => {
// //   try {
// //     console.log(`Making ${method.toUpperCase()} request to ${url}`);
// //     const response = await api[method](url, data);
// //     console.log(`Successful response from ${url}:`, response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error(`API call failed: ${method.toUpperCase()} ${url}`, error);
// //     if (error.response) {
// //       console.error('Error data:', error.response.data);
// //       console.error('Error status:', error.response.status);
// //       console.error('Error headers:', error.response.headers);
// //     } else if (error.request) {
// //       console.error('No response received:', error.request);
// //     } else {
// //       console.error('Error setting up request:', error.message);
// //     }
// //     throw error;
// //   }
// // };

// // // Auth
// // export const login = (username, password) => apiCall('post', '/users/login', { username, password });
// // export const register = (userData) => apiCall('post', '/users/signup', userData);

// // // Products
// // export const getAllProducts = () => apiCall('get', '/products');
// // export const getProductById = (id) => apiCall('get', `/products/${id}`);
// // export const getProductsByCategory = (category) => apiCall('get', `/products/category/${category}`);
// // export const searchProducts = (query) => apiCall('get', `/products/search?query=${query}`);

// // // Cart
// // export const getUserCart = () => {
// //   const userId = localStorage.getItem('userId');
// //   if (!userId) {
// //     throw new Error('User not authenticated');
// //   }
// //   return apiCall('get', `/cart/user/${userId}`);
// // };
// // export const addToCart = (productId, quantity) => {
// //   const userId = localStorage.getItem('userId');
// //   if (!userId) {
// //     throw new Error('User not authenticated');
// //   }
// //   return apiCall('post', '/cart/add', { userId, productId, quantity });
// // };
// // export const updateCartItem = (cartItemId, quantity) => apiCall('put', `/cart/${cartItemId}`, { quantity });
// // export const removeFromCart = (cartItemId) => apiCall('delete', `/cart/${cartItemId}`);

// // // Orders
// // export const createOrder = () => apiCall('post', '/orders');
// // export const getUserOrders = () => apiCall('get', '/orders');

// // // Test connection
// // export const testConnection = () => axios.get('http://localhost:8080/api/test');

// // export default api;


// // new ocde

import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is important for CORS with credentials
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const apiCall = async (method, url, data = null) => {
  try {
    console.log(`Making ${method.toUpperCase()} request to ${url}`);
    const response = await api[method](url, data);
    console.log(`Successful response from ${url}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`API call failed: ${method.toUpperCase()} ${url}`, error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

// Auth
export const login = (username, password) => apiCall('post', '/users/login', { username, password });
export const register = (userData) => apiCall('post', '/users/signup', userData);

// Products
export const getAllProducts = () => apiCall('get', '/products');
export const getProductById = (id) => apiCall('get', `/products/${id}`);
export const getProductsByCategory = (category) => apiCall('get', `/products/category/${category}`);
export const searchProducts = (query) => apiCall('get', `/products/search?query=${query}`);

// Cart
export const getUserCart = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User not authenticated');
  }
  return apiCall('get', `/cart/user/${userId}`);
};
export const addToCart = (productId, quantity) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User not authenticated');
  }
  return apiCall('post', '/cart/add', { userId, productId, quantity });
};
export const updateCartItem = (cartItemId, quantity) => apiCall('put', `/cart/${cartItemId}`, { quantity });
export const removeFromCart = (cartItemId) => apiCall('delete', `/cart/${cartItemId}`);

// // Orders
// export const createOrder = () => apiCall('post', '/orders');
// export const getUserOrder = () => apiCall('get', '/orders');
// export const getAllOrders = () => apiCall('get', '/orders/all');
//  //export const getUserOrders = () => apiCall('get', '/orders');
//  export const getUsersOrder = (orderId) => apiCall('get', `/orders/user/${orderId}`);
//  export const updateOrderStatus = (orderId, newStatus) => apiCall('patch', `/orders/${orderId}`, { status: newStatus });

// // Test connection
// export const testConnection = () => axios.get('http://localhost:8080/api/test');

// export default api;


// new ocde

// Generalized API Call Function
// const apiCall = async (method, url, data = null) => {
//   try {
//     console.log(`Making ${method.toUpperCase()} request to ${url}`);
//     const response = await api[method](url, data);
//     console.log(`Successful response from ${url}:`, response.data);
//     return response.data;
//   } catch (error) {
//     console.error(`API call failed: ${method.toUpperCase()} ${url}`, error);
//     throw error;
//   }
// };

// Fetch All Orders (Admin Only)
export const getAllOrders = async () => {
  return await apiCall('get', '/orders/all');
};

// Fetch User's Personal Orders (Customer Only)
export const getUserOrders = async (userId) => {
  return await apiCall('get', `/orders/user/${userId}`);
};

// Fetch Specific Order by ID
export const getOrderById = async (orderId) => {
  return await apiCall('get', `/orders/${orderId}`);
};

// Create a New Order (Customer Only)
export const createOrder = async (orderData) => {
  return await apiCall('post', '/orders', orderData);
};

// Update Order Status (Admin Only)
export const updateOrderStatus = async (orderId, status) => {
  return await apiCall('put', `/orders/${orderId}/status`, { status });
};


