import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserProfile } from '../services/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mt-8 p-4"
    >
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="bg-white shadow-md rounded p-4 flex">
        <div className="mr-8">
          {user.userImages && (
            <img src={user.userImages} alt="User" className="w-32 h-32 object-cover rounded-full" />
          )}
        </div>
        <div>
          <p className="mb-2"><strong>ID:</strong> {user.id}</p>
          <p className="mb-2"><strong>First Name:</strong> {user.firstname}</p>
          <p className="mb-2"><strong>Last Name:</strong> {user.lastname}</p>
          <p className="mb-2"><strong>Username:</strong> {user.username}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>Address:</strong> {user.address}</p>
          <p className="mb-2"><strong>Phone No:</strong> {user.contactDetails}</p>
          <p className="mb-2"><strong>Roles:</strong> {user.userRoles.map(role => role.name).join(', ')}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;


// updated version


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { getUserProfile } from '../services/api';
// import { getUserData } from '../services/auth';
// import { Container, Row, Col, Card, Image, Alert, Spinner } from 'react-bootstrap';
// import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaUserTag } from 'react-icons/fa';

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true);
//         // First, try to get user data from local storage
//         const localUserData = getUserData();
//         console.log("Local user data:", localUserData); // Log local user data

//         if (localUserData && Object.keys(localUserData).length > 0) {
//           setUser(localUserData);
//         } else {
//           // If not available in local storage, fetch from API
//           const response = await getUserProfile();
//           console.log("API response:", response.data); // Log API response
//           setUser(response.data);
//         }
//         setError('');
//       } catch (err) {
//         setError('Failed to fetch user profile. Please try again later.');
//         console.error('Error fetching user profile:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   useEffect(() => {
//     console.log("Current user state:", user); // Log user state after it's set
//   }, [user]);

//   // ... (loading, error, and null user checks remain the same)

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Container className="mt-5">
//         <Row>
//           <Col md={4}>
//             <Card>
//               <Card.Body className="text-center">
//                 <Image
//                   src={user?.userImages || 'https://via.placeholder.com/150'}
//                   roundedCircle
//                   width={150}
//                   height={150}
//                   className="mb-3"
//                 />
//                 <Card.Title>{`${user?.firstname || ''} ${user?.lastname || ''}`}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">{user?.username || 'N/A'}</Card.Subtitle>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={8}>
//             <Card>
//               <Card.Body>
//                 <Card.Title>User Details</Card.Title>
//                 <Row className="mb-3">
//                   <Col sm={3}><FaUser /> ID:</Col>
//                   <Col sm={9}>{user?.id || 'N/A'}</Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={3}><FaEnvelope /> Email:</Col>
//                   <Col sm={9}>{user?.email || 'N/A'}</Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={3}><FaMapMarkerAlt /> Address:</Col>
//                   <Col sm={9}>{user?.address || 'N/A'}</Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={3}><FaPhone /> Phone:</Col>
//                   <Col sm={9}>{user?.contactDetails || 'N/A'}</Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col sm={3}><FaUserTag /> Roles:</Col>
//                   <Col sm={9}>
//                     {user?.userRoles && user.userRoles.length > 0
//                       ? user.userRoles.map(role => role.name).join(', ')
//                       : 'No roles assigned'}
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </motion.div>
//   );
// };

// export default UserProfile;