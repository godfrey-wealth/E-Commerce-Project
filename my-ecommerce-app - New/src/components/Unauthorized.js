

// src/components/Unauthorized.js
import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Unauthorized Access</Alert.Heading>
        <p>
          You do not have permission to access this page. If you believe this is an error, please contact your administrator.
        </p>
        <hr />
        <p className="mb-0">
          <Link to="/">Return to Home</Link>
        </p>
      </Alert>
    </Container>
  );
};

export default Unauthorized;