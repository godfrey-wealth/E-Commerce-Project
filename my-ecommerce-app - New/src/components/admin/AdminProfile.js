

// // AdminProfile.js
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { getUserProfile } from '../../services/api';
// import { isAuthenticated, getUserRole } from '../../services/auth';
// import { useNavigate } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserShield, FaClipboardList, FaUsers, FaBoxes } from 'react-icons/fa';

// const AdminProfile = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const fetchUserProfile = useCallback(async () => {
//     try {
//       const response = await getUserProfile();
//       setUser(response.data);
//     } catch (err) {
//       setError('Failed to fetch user profile');
//     }
//   }, []);

//   useEffect(() => {
//     const checkAuthAndFetch = async () => {
//       if (!isAuthenticated()) {
//         navigate('/login');
//         return;
//       }

//       const userRole = getUserRole();
//       if (userRole !== 'ADMIN') {
//         //navigate('/adminprofile');
//         navigate('/unauthorized');
//         return;
//       }

//       await fetchUserProfile();
//     };

//     checkAuthAndFetch();
//   }, [navigate, fetchUserProfile]);

//   if (error) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="text-red-500 text-center mt-8"
//       >
//         {error}
//       </motion.div>
//     );
//   }

//   if (!user) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="text-center mt-8"
//       >
//         Loading...
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto mt-8 p-4"
//     >
//       <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
//       <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start">
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="mb-6 md:mb-0 md:mr-8"
//         >
//           {user.userImages ? (
//             <img src={user.userImages} alt="Admin" className="w-40 h-40 object-cover rounded-full shadow-md" />
//           ) : (
//             <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
//               <FaUser className="text-6xl text-gray-500" />
//             </div>
//           )}
//         </motion.div>
//         <div className="flex-1">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="mb-4"
//           >
//             <h3 className="text-2xl font-semibold">{`${user.firstname} ${user.lastname}`}</h3>
//             <p className="text-gray-600">ID: {user.id}</p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="mb-4"
//           >
//             <p className="flex items-center mb-2"><FaUser className="mr-2" /> {user.username}</p>
//             <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> {user.email}</p>
//             <p className="flex items-center mb-2"><FaPhone className="mr-2" /> {user.contactDetails}</p>
//             <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> {user.address}</p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             <p className="flex items-center mb-4">
//               <FaUserShield className="mr-2" />
//               Roles: {user.userRoles.map(role => role.name).join(', ')}
//             </p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
//               onClick={() => navigate('/getorders')}
//             >
//               <FaClipboardList className="mr-2" /> Manage Orders
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
//               onClick={() => navigate('/users')}
//             >
//               <FaUsers className="mr-2" /> Manage Users
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-purple-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
//               onClick={() => navigate('/products')}
//             >
//               <FaBoxes className="mr-2" /> Manage Products
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AdminProfile;




// new code version

// AdminProfile.js
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getUserProfile } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserShield, FaClipboardList, FaUsers, FaBoxes } from 'react-icons/fa';

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (err) {
      setError('Failed to fetch user profile');
      console.error('Error fetching user profile:', err);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-red-500 text-center mt-8"
      >
        {error}
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center mt-8"
      >
        Loading...
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mt-8 p-4"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6 md:mb-0 md:mr-8"
        >
          {user.userImages ? (
            <img src={user.userImages} alt="Admin" className="w-40 h-40 object-cover rounded-full shadow-md" />
          ) : (
            <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
              <FaUser className="text-6xl text-gray-500" />
            </div>
          )}
        </motion.div>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <h3 className="text-2xl font-semibold">{`${user.firstname} ${user.lastname}`}</h3>
            <p className="text-gray-600">ID: {user.id}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <p className="flex items-center mb-2"><FaUser className="mr-2" /> {user.username}</p>
            <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> {user.email}</p>
            <p className="flex items-center mb-2"><FaPhone className="mr-2" /> {user.contactDetails}</p>
            <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> {user.address}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="flex items-center mb-4">
              <FaUserShield className="mr-2" />
              Roles: {user.userRoles.map(role => role.name).join(', ')}
            </p>
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              onClick={() => navigate('/getorders')}
            >
              <FaClipboardList className="mr-2" /> Manage Orders
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              onClick={() => navigate('/users')}
            >
              <FaUsers className="mr-2" /> Manage Users
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              onClick={() => navigate('/products')}
            >
              <FaBoxes className="mr-2" /> Manage Products
            </motion.button>
          </motion.div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminProfile;
