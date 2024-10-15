//package com.example.ecommerceshoppingcart.persistence.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "orders")
//@Data
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//public class Order {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "cart_id")
//    private Cart cart;
//
//    @Column(name = "total_amount")
//    private BigDecimal totalAmount;
//
//    @Column(name = "created_at")
//    private LocalDateTime createdAt;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    private String discountCode;
//    private BigDecimal discountAmount;
//
//    //Add these new fields
//    private String paymentIntentId;
//    private String paymentStatus;
//}


// new fields

package com.example.ecommerceshoppingcart.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    private String discountCode;
    private BigDecimal discountAmount;

    @Column(precision = 10, scale = 2)
    private String paymentIntentId;
    private String paymentStatus;

    // Helper method to add order items
    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }

    // Helper method to remove order items
    public void removeOrderItem(OrderItem orderItem) {
        orderItems.remove(orderItem);
        orderItem.setOrder(null);
    }
}