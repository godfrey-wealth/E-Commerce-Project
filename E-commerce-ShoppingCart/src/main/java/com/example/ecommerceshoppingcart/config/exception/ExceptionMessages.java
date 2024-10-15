package com.example.ecommerceshoppingcart.config.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ExceptionMessages extends ResponseStatusException {

    public ExceptionMessages(String errorcode){ super(HttpStatus.BAD_REQUEST, errorcode);}
    }


