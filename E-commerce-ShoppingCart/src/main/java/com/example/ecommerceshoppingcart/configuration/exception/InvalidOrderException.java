package com.example.ecommerceshoppingcart.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidOrderException extends ResponseStatusException {
    public InvalidOrderException() {
        super(HttpStatus.BAD_REQUEST,"ORDER_ID_DOES_NOT_EXISTS");
    }
}