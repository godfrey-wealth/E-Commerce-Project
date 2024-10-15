package com.example.ecommerceshoppingcart.config.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.awt.*;

public class UserAlreadyExistsException extends ResponseStatusException {
    public UserAlreadyExistsException(String message) {
        super(HttpStatus.BAD_REQUEST, "USER_ALREADY_EXISTS");
    }
}
