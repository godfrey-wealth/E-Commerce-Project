package com.example.ecommerceshoppingcart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private Long cartId;
    private Long userId;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;
    private String discountCode;
    private BigDecimal discountAmount;
    private String paymentStatus;
    private String paymentIntentId;
//    private String paymentMethodId;
    private String paymentIntentClientSecret;
    private List<OrderItemDto> orderItems;
}