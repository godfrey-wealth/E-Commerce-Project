import React from 'react';
import { Button, Image, Form } from 'react-bootstrap';

const CartProduct = ({ id, name, price, quantity, image, onRemove, onUpdateQuantity }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <Image src={image} alt={name} width={50} height={50} className="me-3" />
      <div>
        <h6>{name}</h6>
        <p>Price: ${price.toFixed(2)}</p>
      </div>
      <div>
        <Form.Control
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onUpdateQuantity(parseInt(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
      <Button variant="danger" size="sm" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
};

export default CartProduct;