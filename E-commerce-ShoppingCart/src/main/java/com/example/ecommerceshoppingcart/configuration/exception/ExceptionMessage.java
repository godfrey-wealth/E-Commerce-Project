package com.example.ecommerceshoppingcart.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ExceptionMessage extends ResponseStatusException {

       public ExceptionMessage(){ super(HttpStatus.BAD_REQUEST, "PASSWORD_AND_CONFIRM_PASSWORD_DONT_MATCH" );}
    }


