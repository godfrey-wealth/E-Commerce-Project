package com.example.ecommerceshoppingcart.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private Long id;
    private Long productId;
    private Integer quantity;
    private String name;
    private String image;
    private String status;
    private BigDecimal itemTotal;
}