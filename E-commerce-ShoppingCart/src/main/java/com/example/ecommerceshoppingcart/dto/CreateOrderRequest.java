package com.example.ecommerceshoppingcart.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateOrderRequest {

    private Long userId;
    private String discountCode;
    private String paymentMethodId;
    private BigDecimal discountAmount;

    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDiscountCode() {
        return discountCode;
    }

    public void setDiscountCode(String discountCode) {
        this.discountCode = discountCode;
    }
}
