package com.example.ecommerceshoppingcart.dto;


import lombok.Data;

@Data
public class UpdateCartRequest {

    private Integer quantity;
//private Integer quantity;

    // Getter and setter
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}