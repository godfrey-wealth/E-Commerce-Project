
// // New code Version

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { login, getUserRole, isAuthenticated, logout } from '../services/auth';
// import { motion } from 'framer-motion';
// import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated()) {
//       redirectBasedOnRole(getUserRole());
//     }
//   }, []);

//   const redirectBasedOnRole = (role) => {
//     if (role === 'ADMIN') {
//       navigate('/getorders');
//     } else if (role === 'CUSTOMER') {
//       navigate('/products');
//     } else {
//       logout();
//       setError('Invalid user role. Please contact support.');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
//     try {
//       await login(username, password);
//       const userRole = getUserRole();
//       redirectBasedOnRole(userRole);
//     } catch (err) {
//       setError('Invalid username or password');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md mx-auto mt-10"
//     >
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <h2 className="text-2xl mb-6 text-center font-bold">Login</h2>
//         {error && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-red-500 text-xs italic mb-4"
//           >
//             {error}
//           </motion.p>
//         )}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//             Username
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="username"
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//             Password
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//             id="password"
//             type="password"
//             placeholder="******************"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
//             type="submit"
//             disabled={isLoading}
//           >
//             <FaSignInAlt className="mr-2" />
//             {isLoading ? 'Signing In...' : 'Sign In'}
//           </motion.button>
//           <Link
//             to="/register"
//             className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 flex items-center"
//           >
//             <FaUserPlus className="mr-1" /> Register
//           </Link>
//         </div>
//       </form>
//     </motion.div>
//   );
// };

// export default Login;


// new code version

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { login, isAuthenticated, getUserRole } from '../services/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      if (role) {
        redirectBasedOnRole(role);
      }
    }
  }, []);

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'ADMIN':
        navigate('/getorders');
        break;
      case 'CUSTOMER':
        navigate('/products');
        break;
      default:
        setError('Invalid user role. Please contact support.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      const role = getUserRole();
      if (role) {
        redirectBasedOnRole(role);
      } else {
        throw new Error('User role not found');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10"
    >
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-6 text-center font-bold">Login</h2>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-xs italic mb-4"
          >
            {error}
          </motion.p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            type="submit"
            disabled={isLoading}
          >
            <FaSignInAlt className="mr-2" />
            {isLoading ? 'Signing In...' : 'Sign In'}
          </motion.button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 flex items-center"
          >
            <FaUserPlus className="mr-1" /> Register
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default Login;