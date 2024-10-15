package com.example.ecommerceshoppingcart.config.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ProductAlreadyExistsException extends ResponseStatusException {
    public ProductAlreadyExistsException() {
        super(HttpStatus.BAD_REQUEST, "PRODUCT_ALREADY_EXISTS");
    }
}
