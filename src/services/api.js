
// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await api.post('/users/refresh-token', { refreshToken });
//         localStorage.setItem('token', response.data.accessToken);
//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export const login = (username, password) => api.post('/users/login', { username, password });
// export const register = (userData) => api.post('/users/signup', userData);
// export const getUserProfile = () => api.get('/users/profile');

// export default api;


// New Code 

import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This enables sending cookies with cross-origin requests
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/users/refresh-token', { refreshToken });
        localStorage.setItem('token', response.data.accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

export const loginApi = (username, password) => api.post('/users/login', { username, password });
export const register = (userData) => api.post('/users/signup', userData);
export const getUserProfile = () => api.get('/users/profile');
// get AllUsers 
export const getAllUsers = () => api.get('/users');

// delete User
export const deleteUser = (userId) => api.delete(`/users/${userId}`);

// Add more API calls as needed
export const getUserCart = (userId) => api.get(`/cart/user/${userId}`);
export const addToCart = (productId, quantity) => api.post('/cart/add', { productId, quantity });
export const removeFromCart = (cartItemId) => api.delete(`/cart/remove/${cartItemId}`);
export const updateCartItemQuantity = (cartItemId, quantity) => api.put(`/cart/update/${cartItemId}`, { quantity });

export default api;