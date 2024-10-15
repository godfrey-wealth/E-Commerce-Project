

// new version

// import React, { useState, useEffect, useCallback } from 'react';
// import { Card, Button, Form, Row, Col, Container, Offcanvas, Spinner, Alert } from 'react-bootstrap';
// import { motion, AnimatePresence } from 'framer-motion';
// import styled from 'styled-components';
// import { getAllProducts, searchProducts, getProductsByCategory } from '../services/shopApi';
// import { useCart } from '../contexts/CartContext';
// import { FaSearch, FaBars } from 'react-icons/fa';

// const categories = ['All', 'Electronics', 'Cologne', 'Accessories', 'Home-Appliances', 'Loafers', 'Snickers', 'Clothes'];

// const StyledSidebar = styled.div`
//   position: sticky;
//   top: 0;
//   height: 100vh;
//   overflow-y: auto;

//   @media (max-width: 767px) {
//     display: none;
//   }
// `;

// const MainContent = styled.div`
//   min-height: 100vh;
// `;

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [error, setError] = useState('');
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const { addItemToCart, getProductQuantity, error: cartError } = useCart();

//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       let response;
//       if (selectedCategory === 'All') {
//         response = await getAllProducts();
//       } else {
//         response = await getProductsByCategory(selectedCategory);
//       }
//       setProducts(response);
//     } catch (err) {
//       console.error('Failed to fetch products:', err);
//       setError('Failed to fetch products. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedCategory]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) {
//       fetchProducts();
//       return;
//     }
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await searchProducts(searchQuery);
//       setProducts(response);
//     } catch (err) {
//       console.error('Failed to search products:', err);
//       setError('Failed to search products. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSearchQuery('');
//     setShowSidebar(false);
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       await addItemToCart(productId, 1);
//     } catch (error) {
//       console.error('Failed to add item to cart:', error);
//     }
//   };

//   const filterProductsByName = (products, query) => {
//     if (!query) return products;
//     return products.filter(product => 
//       product.name.toLowerCase().includes(query.toLowerCase())
//     );
//   };

//   const displayedProducts = filterProductsByName(products, searchQuery);

//   const Sidebar = () => (
//     <div className="bg-light p-3 h-100">
//       <h4 className="mb-3">Categories</h4>
//       {categories.map((category) => (
//         <Button
//           key={category}
//           variant={selectedCategory === category ? "primary" : "outline-primary"}
//           className="d-block mb-2 w-100"
//           onClick={() => handleCategoryClick(category)}
//         >
//           {category}
//         </Button>
//       ))}
//     </div>
//   );

//   return (
//     <Container fluid>
//       <Row>
//         <Col md={3}>
//           <StyledSidebar>
//             <Sidebar />
//           </StyledSidebar>
//         </Col>

//         <Col md={9}>
//           <MainContent>
//             <div className="d-md-none mb-3">
//               <Button variant="primary" onClick={() => setShowSidebar(true)}>
//                 <FaBars /> Categories
//               </Button>
//             </div>

//             <h2 className="mb-4">Our Products</h2>

//             <Form onSubmit={handleSearch} className="mb-4">
//               <div className="input-group">
//                 <Form.Control
//                   type="text"
//                   placeholder="Search products by name..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <Button type="submit" variant="primary">
//                   <FaSearch />
//                 </Button>
//               </div>
//             </Form>

//             {error && <Alert variant="danger">{error}</Alert>}
//             {cartError && <Alert variant="danger">{cartError}</Alert>}

//             {isLoading ? (
//               <div className="text-center">
//                 <Spinner animation="border" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//               </div>
//             ) : displayedProducts.length > 0 ? (
//               <Row xs={1} sm={2} lg={3} className="g-4">
//                 <AnimatePresence>
//                   {displayedProducts.map((product) => (
//                     <Col key={product.id}>
//                       <motion.div
//                         layout
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         whileHover={{ scale: 1.05 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <Card className="h-100 shadow-sm">
//                           <div className="overflow-hidden" style={{ height: '200px' }}>
//                             <Card.Img 
//                               variant="top" 
//                               src={product.image} 
//                               alt={product.name}
//                               className="w-100 h-100 object-fit-cover"
//                               style={{ transition: 'transform 0.3s ease-in-out' }}
//                               onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
//                               onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                             />
//                           </div>
//                           <Card.Body className="d-flex flex-column">
//                             <Card.Title className="font-weight-bold">{product.name}</Card.Title>
//                             <Card.Text className="text-muted mb-2">{product.category}</Card.Text>
//                             <Card.Text className="font-weight-bold mb-2 text-primary">${product.price.toFixed(2)}</Card.Text>
//                             {getProductQuantity(product.id) > 0 ? (
//                               <Button variant="primary" disabled>
//                                 In Cart
//                               </Button>
//                             ) : (
//                               <Button variant="primary" onClick={() => handleAddToCart(product.id)}>Add To Cart</Button>
//                             )}
//                           </Card.Body>
//                         </Card>
//                       </motion.div>
//                     </Col>
//                   ))}
//                 </AnimatePresence>
//               </Row>
//             ) : (
//               <p>No products found.</p>
//             )}
//           </MainContent>
//         </Col>
//       </Row>

//       <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)}>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Categories</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Sidebar />
//         </Offcanvas.Body>
//       </Offcanvas>
//     </Container>
//   );
// };

// export default ProductList;




/// Updated Code

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Form, Row, Col, Container, Offcanvas, Spinner, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { getAllProducts, searchProducts, getProductsByCategory } from '../services/shopApi';
import { useCart } from '../contexts/CartContext';
import { FaSearch, FaBars } from 'react-icons/fa';

const categories = ['All', 'Electronics', 'Cologne', 'Accessories', 'Home-Appliances', 'Loafers', 'Snickers', 'Clothes'];

const StyledSidebar = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MainContent = styled.div`
  min-height: 100vh;
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cart = useCart();

  useEffect(() => {
    console.log(cart.items);
  }, [cart.items]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      let response;
      if (selectedCategory === 'All') {
        response = await getAllProducts();
      } else {
        response = await getProductsByCategory(selectedCategory);
      }
      setProducts(response);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await searchProducts(searchQuery);
      setProducts(response);
    } catch (err) {
      console.error('Failed to search products:', err);
      setError('Failed to search products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setShowSidebar(false);
  };

  const filterProductsByName = (products, query) => {
    if (!query) return products;
    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const displayedProducts = filterProductsByName(products, searchQuery);

  const Sidebar = () => (
    <div className="bg-light p-3 h-100">
      <h4 className="mb-3">Categories</h4>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "primary" : "outline-primary"}
          className="d-block mb-2 w-100"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <StyledSidebar>
            <Sidebar />
          </StyledSidebar>
        </Col>

        <Col md={9}>
          <MainContent>
            <div className="d-md-none mb-3">
              <Button variant="primary" onClick={() => setShowSidebar(true)}>
                <FaBars /> Categories
              </Button>
            </div>

            <h2 className="mb-4">Our Products</h2>

            <Form onSubmit={handleSearch} className="mb-4">
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Search products by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="primary">
                  <FaSearch />
                </Button>
              </div>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}
            {cart.error && <Alert variant="danger">{cart.error}</Alert>}

            {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : displayedProducts.length > 0 ? (
              <Row xs={1} sm={2} lg={3} className="g-4">
                <AnimatePresence>
                  {displayedProducts.map((product) => (
                    <Col key={product.id}>
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="h-100 shadow-sm">
                          <div className="overflow-hidden" style={{ height: '200px' }}>
                            <Card.Img 
                              variant="top" 
                              src={product.image} 
                              alt={product.name}
                              className="w-100 h-100 object-fit-cover"
                              style={{ transition: 'transform 0.3s ease-in-out' }}
                              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                          </div>
                          <Card.Body className="d-flex flex-column">
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>${product.price.toFixed(2)}</Card.Text>
                            {cart.getProductQuantity(product.id) > 0 ? (
                              <>
                                <Form as={Row}>
                                  <Form.Label column="true" sm="6">In Cart: {cart.getProductQuantity(product.id)}</Form.Label>
                                  <Col sm="6">
                                    <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                                    <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
                                  </Col>
                                </Form>
                                <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from cart</Button>
                              </>
                            ) : (
                              <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
                            )}
                          </Card.Body>
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </AnimatePresence>
              </Row>
            ) : (
              <p>No products found.</p>
            )}
          </MainContent>
        </Col>
      </Row>

      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default ProductList;