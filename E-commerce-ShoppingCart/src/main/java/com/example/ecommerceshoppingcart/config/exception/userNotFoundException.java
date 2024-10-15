package com.example.ecommerceshoppingcart.config.exception;

public class userNotFoundException extends RuntimeException{

    public userNotFoundException(Long id){
        super("User with that particular User-Id does not Exist :" + id);
    }
}
