
// // import React from 'react';
// // import { Navigate } from 'react-router-dom';
// // import { isAuthenticated } from '../services/auth';

// // const ProtectedRoute = ({ children }) => {
// //   if (!isAuthenticated()) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   return children;
// // };

// // export default ProtectedRoute;


// // new code

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { isAuthenticated, getUserRole } from '../services/auth';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles) {
//     const userRole = getUserRole();
//     if (!allowedRoles.includes(userRole)) {
//       return <Navigate to="/unauthorized" replace />;
//     }
//   }

//   return children;
// };

// export default ProtectedRoute;


 // new code
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../services/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    const userRole = getUserRole();
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;