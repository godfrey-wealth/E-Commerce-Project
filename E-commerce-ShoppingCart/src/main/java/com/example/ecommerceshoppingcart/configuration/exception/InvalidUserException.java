package com.example.ecommerceshoppingcart.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidUserException extends ResponseStatusException {
    public InvalidUserException(String errorcode) {
        super(HttpStatus.BAD_REQUEST,errorcode);
    }
}