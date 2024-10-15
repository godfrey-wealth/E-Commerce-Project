

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { CartProvider } from './contexts/CartContext';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import UserProfile from './pages/UserProfile';
// import ProtectedRoute from './components/ProtectedRoute';
// import ProductList from './components/ProductList';
// import Cart from './components/Cart';
// import Order from './components/Order';
// import Checkout from './components/Checkout';
// import CheckoutSuccess from './components/CheckoutSuccess';
// import GetOrder from './components/GetOrder';

// function App() {
//   return (
//     <Router>
//       <CartProvider>
//         <div className="flex flex-col min-h-screen">
//           <Header />
//           <main className="flex-grow container mx-auto px-4 py-8">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/products" element={<ProductList />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/order" element={<Order />} />
//               <Route path="/orders" element={<GetOrder />} />
//               <Route path='/checkout' element={<Checkout />} />
//               <Route path="/Checkout-Success" element={<CheckoutSuccess />} />
//               <Route 
//                 path="/profile" 
      
//                 element={
//                   <ProtectedRoute>
//                     <UserProfile />
                   
//                   </ProtectedRoute>
//                 } 
//               />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;



// new code


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Order from './components/Order';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import GetOrder from './components/GetOrder';
import GetAllOrders from './components/admin/GetAllOrders';
import Unauthorized from './components/Unauthorized';

import AdminProfile from './components/admin/AdminProfile';
import AllUsers from './components/admin/AllUsers';
import AdminPage from './components/admin/AdminPage';


function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/orders" element={<GetOrder />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
             
              <Route path="/getorders" element={<GetAllOrders />} />	
              <Route path="/users" element={<AllUsers />} />
              <Route path="/adminprofile" element={<AdminProfile />} />
              <Route path='/admin' element={<AdminPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                // path="/" 
                // element={
                //   <ProtectedRoute allowedRoles={['ADMIN']}>
                //     {/* <GetAllOrders /> */}
                //   </ProtectedRoute>
                // } 
               /> 
            {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;



// New code Version

