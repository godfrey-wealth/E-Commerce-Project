package com.example.ecommerceshoppingcart.configuration.exception;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

public class ProductNotFoundWithThatIDException extends RuntimeException{

    public ProductNotFoundWithThatIDException(){
        super("Product with that particular  Product-Id does not Exist :" + id);
    }
}
