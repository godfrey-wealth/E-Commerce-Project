package com.example.ecommerceshoppingcart.configuration;

public class CustomeException {


    public static class UserAlreadyExistsException extends RuntimeException {
        public UserAlreadyExistsException(String message) {
            super(message);
        }
    }

    public static class InvalidCredentialsException extends RuntimeException {
        public InvalidCredentialsException() {
            super("Invalid email or password");
        }
    }

}