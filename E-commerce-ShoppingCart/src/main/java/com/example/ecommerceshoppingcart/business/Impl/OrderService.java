//
//
//package com.example.ecommerceshoppingcart.business.Impl;
//
//import com.example.ecommerceshoppingcart.config.exception.ProductNotFoundException;
//import com.example.ecommerceshoppingcart.config.exception.UserNotFoundWithIDException;
//import com.example.ecommerceshoppingcart.dto.CreateOrderRequest;
//import com.example.ecommerceshoppingcart.dto.OrderDto;
//import com.example.ecommerceshoppingcart.persistence.OrderRepository;
//import com.example.ecommerceshoppingcart.persistence.CartRepository;
//import com.example.ecommerceshoppingcart.persistence.UserRepository;
//import com.example.ecommerceshoppingcart.persistence.entity.Order;
//import com.example.ecommerceshoppingcart.persistence.entity.Cart;
//import com.example.ecommerceshoppingcart.persistence.entity.User;
//import com.stripe.model.PaymentIntent;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class OrderService {
//    private final OrderRepository orderRepository;
//    private final CartRepository cartRepository;
//    private final UserRepository userRepository;
//    private final StripeService stripeService;
//
////    @Transactional
////    public OrderDto createOrder(CreateOrderRequest request) {
////        try {
////            User user = userRepository.findById(request.getUserId())
////                    .orElseThrow(() -> new UserNotFoundWithIDException("User not found: " + request.getUserId()));
////
////            List<Cart> userCart = cartRepository.findByUser(user);
////
////            if (userCart.isEmpty()) {
////                throw new IllegalStateException("User's cart is empty");
////            }
////
////            BigDecimal totalAmount = userCart.stream()
////                    .map(Cart::getItemTotal)
////                    .reduce(BigDecimal.ZERO, BigDecimal::add);
////
////            BigDecimal discountAmount = applyDiscount(request.getDiscountCode(), totalAmount);
////
////            Order order = Order.builder()
////                    .user(user)
////                    .cart(userCart.get(0)) // Assuming one cart per order for simplicity
////                    .totalAmount(totalAmount.subtract(discountAmount))
////                    .createdAt(LocalDateTime.now())
////                    .discountCode(request.getDiscountCode())
////                    .discountAmount(discountAmount)
////                    .build();
////
////            Order savedOrder = orderRepository.save(order);
////
////            // Clear the user's cart after creating the order
////            cartRepository.deleteAll(userCart);
////
////            return convertToDto(savedOrder);
////        } catch (Exception e) {
////            log.error("Error creating order: ", e);
////            throw new RuntimeException("Error creating order: " + e.getMessage(), e);
////        }
////    }
//
//    @Transactional
//    public OrderDto createOrder(CreateOrderRequest request) {
//        try {
//            User user = userRepository.findById(request.getUserId())
//                    .orElseThrow(() -> new UserNotFoundWithIDException("User not found: " + request.getUserId()));
//
//            List<Cart> userCart = cartRepository.findByUser(user);
//
//            if (userCart.isEmpty()) {
//                throw new IllegalStateException("User's cart is empty");
//            }
//
//            BigDecimal totalAmount = userCart.stream()
//                    .map(Cart::getItemTotal)
//                    .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//            BigDecimal discountAmount = applyDiscount(request.getDiscountCode(), totalAmount);
//            BigDecimal finalAmount = totalAmount.subtract(discountAmount);
//
//            // Create Stripe PaymentIntent
//            PaymentIntent paymentIntent = stripeService.createPaymentIntent(finalAmount, "usd");
//
//            Order order = Order.builder()
//                    .user(user)
//                    .cart(userCart.get(0))
//                    .totalAmount(finalAmount)
//                    .createdAt(LocalDateTime.now())
//                    .discountCode(request.getDiscountCode())
//                    .discountAmount(discountAmount)
//                    .paymentIntentId(paymentIntent.getId())
//                    .paymentStatus("pending")
//                    .build();
//
//            Order savedOrder = orderRepository.save(order);
//
//            // Clear the user's cart after creating the order
//            cartRepository.deleteAll(userCart);
//
//            OrderDto orderDto = convertToDto(savedOrder);
//            orderDto.setPaymentIntentClientSecret(paymentIntent.getClientSecret());
//
//            return orderDto;
//        } catch (Exception e) {
//            log.error("Error creating order: ", e);
//            throw new RuntimeException("Error creating order: " + e.getMessage(), e);
//        }
//    }
//
//    public List<OrderDto> getUserOrders(Long userId) {
//        try {
//            User user = userRepository.findById(userId)
//                    .orElseThrow(() -> new UserNotFoundWithIDException("User not found"));
//            return orderRepository.findByUser(user).stream()
//                    .map(this::convertToDto)
//                    .collect(Collectors.toList());
//        } catch (Exception e) {
//            log.error("Error getting user orders: ", e);
//            throw new RuntimeException("Error getting user orders: " + e.getMessage(), e);
//        }
//    }
//
//    public OrderDto getOrderById(Long orderId) {
//        try {
//            Order order = orderRepository.findById(orderId)
//                    .orElseThrow(() -> new ProductNotFoundException("Order not found: " + orderId));
//            return convertToDto(order);
//        } catch (Exception e) {
//            log.error("Error getting order by ID: ", e);
//            throw new RuntimeException("Error getting order by ID: " + e.getMessage(), e);
//        }
//    }
//
//    private BigDecimal applyDiscount(String discountCode, BigDecimal totalAmount) {
//        // Implement discount logic
//        if (discountCode != null && discountCode.equals("DISCOUNT5")) {
//            return totalAmount.multiply(new BigDecimal("0.05")); // 5% discount
//        }
//        return BigDecimal.ZERO;
//    }
//
////    private OrderDto convertToDto(Order order) {
////        return OrderDto.builder()
////                .id(order.getId())
////                .userId(order.getUser().getId())
////                .cartId(order.getCart().getId())
////                .totalAmount(order.getTotalAmount())
////                .createdAt(order.getCreatedAt())
////                .discountCode(order.getDiscountCode())
////                .discountAmount(order.getDiscountAmount())
////                .build();
////    }
//
//    private OrderDto convertToDto(Order order) {
//        return OrderDto.builder()
//                .id(order.getId())
//                .userId(order.getUser().getId())
//                .cartId(order.getCart().getId())
//                .totalAmount(order.getTotalAmount())
//                .createdAt(order.getCreatedAt())
//                .discountCode(order.getDiscountCode())
//                .discountAmount(order.getDiscountAmount())
//                .paymentStatus(order.getPaymentStatus())
//                .build();
//    }
//
//    @Transactional
//    public void cancelOrder(Long orderId) {
//        try {
//            Order order = orderRepository.findById(orderId)
//                    .orElseThrow(() -> new ProductNotFoundException("Order not found: " + orderId));
//            orderRepository.delete(order);
//        } catch (Exception e) {
//            log.error("Error canceling order: ", e);
//            throw new RuntimeException("Error canceling order: " + e.getMessage(), e);
//        }
//    }
//
//    public List<OrderDto> getAllOrders() {
//        try {
//            return orderRepository.findAll().stream()
//                    .map(this::convertToDto)
//                    .collect(Collectors.toList());
//        } catch (Exception e) {
//            log.error("Error getting all orders: ", e);
//            throw new RuntimeException("Error getting all orders: " + e.getMessage(), e);
//        }
//    }
//
//    public BigDecimal getTotalRevenue() {
//        try {
//            return orderRepository.findAll().stream()
//                    .map(Order::getTotalAmount)
//                    .reduce(BigDecimal.ZERO, BigDecimal::add);
//        } catch (Exception e) {
//            log.error("Error calculating total revenue: ", e);
//            throw new RuntimeException("Error calculating total revenue: " + e.getMessage(), e);
//        }
//    }
//}


// New code

package com.example.ecommerceshoppingcart.business.Impl;

import com.example.ecommerceshoppingcart.config.exception.ProductNotFoundException;
import com.example.ecommerceshoppingcart.config.exception.UserNotFoundWithIDException;
import com.example.ecommerceshoppingcart.dto.CreateOrderRequest;
import com.example.ecommerceshoppingcart.dto.OrderDto;
import com.example.ecommerceshoppingcart.dto.OrderItemDto;
import com.example.ecommerceshoppingcart.persistence.OrderRepository;
import com.example.ecommerceshoppingcart.persistence.CartRepository;
import com.example.ecommerceshoppingcart.persistence.UserRepository;
import com.example.ecommerceshoppingcart.persistence.entity.Order;
import com.example.ecommerceshoppingcart.persistence.entity.OrderItem;
import com.example.ecommerceshoppingcart.persistence.entity.Cart;
import com.example.ecommerceshoppingcart.persistence.entity.User;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final StripeService stripeService;

    @Transactional
    public OrderDto createOrder(CreateOrderRequest request) {
        try {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new UserNotFoundWithIDException("User not found: " + request.getUserId()));

            List<Cart> userCart = cartRepository.findByUser(user);

            if (userCart.isEmpty()) {
                throw new IllegalStateException("User's cart is empty");
            }

            BigDecimal totalAmount = userCart.stream()
                    .map(Cart::getItemTotal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal discountAmount;
            if (request.getDiscountAmount() != null && request.getDiscountAmount().compareTo(BigDecimal.ZERO) > 0) {
                discountAmount = request.getDiscountAmount();
            } else {
                discountAmount = applyDiscount(request.getDiscountCode(), totalAmount);
            }
            BigDecimal finalAmount = totalAmount.subtract(discountAmount);

            // Create Stripe PaymentIntent
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(finalAmount, "usd");

            Order order = Order.builder()
                    .user(user)
                    .totalAmount(finalAmount)
                    .createdAt(LocalDateTime.now())
                    .discountCode(request.getDiscountCode())
                    .discountAmount(discountAmount)
                    .paymentIntentId(paymentIntent.getId())
                    .paymentStatus("pending")
                    .build();

            List<OrderItem> orderItems = userCart.stream()
                    .map(cartItem -> OrderItem.builder()
                            .order(order)
                            .product(cartItem.getProduct())
                            .quantity(cartItem.getQuantity())
                            .price(cartItem.getProduct().getPrice())
                            .productName(cartItem.getProduct().getName())
                            .productImage(cartItem.getProduct().getImage())
                            .build())
                    .collect(Collectors.toList());

            order.setOrderItems(orderItems);

            Order savedOrder = orderRepository.save(order);

            // Clear the user's cart after creating the order
            cartRepository.deleteAll(userCart);

            OrderDto orderDto = convertToDto(savedOrder);
            orderDto.setPaymentIntentClientSecret(paymentIntent.getClientSecret());

            return orderDto;
        } catch (Exception e) {
            log.error("Error creating order: ", e);
            throw new RuntimeException("Error creating order: " + e.getMessage(), e);
        }
    }

    public List<OrderDto> getUserOrders(Long userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new UserNotFoundWithIDException("User not found"));
            return orderRepository.findByUser(user).stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error getting user orders: ", e);
            throw new RuntimeException("Error getting user orders: " + e.getMessage(), e);
        }
    }

    public OrderDto getOrderById(Long orderId) {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new ProductNotFoundException("Order not found: " + orderId));
            return convertToDto(order);
        } catch (Exception e) {
            log.error("Error getting order by ID: ", e);
            throw new RuntimeException("Error getting order by ID: " + e.getMessage(), e);
        }
    }



    // new changes

    private BigDecimal applyDiscount(String discountCode, BigDecimal totalAmount) {
        if (discountCode == null) {
            return BigDecimal.ZERO;
        }

        switch (discountCode) {
            case "DISCOUNT5":
                return totalAmount.multiply(new BigDecimal("0.05")); // 5% discount
            case "DISCOUNT10":
                return totalAmount.multiply(new BigDecimal("0.10")); // 10% discount
            case "DISCOUNT20":
                return totalAmount.multiply(new BigDecimal("0.20")); // 20% discount
            default:
                return BigDecimal.ZERO;
        }
    }

    private OrderDto convertToDto(Order order) {
        return OrderDto.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .totalAmount(order.getTotalAmount())
                .createdAt(order.getCreatedAt())
                .discountCode(order.getDiscountCode())
                .discountAmount(order.getDiscountAmount())
                .paymentStatus(order.getPaymentStatus())
                .paymentIntentId(order.getPaymentIntentId())
                .orderItems(order.getOrderItems().stream()
                        .map(this::convertToOrderItemDto)
                        .collect(Collectors.toList()))
                .build();
    }

    private OrderItemDto convertToOrderItemDto(OrderItem orderItem) {
        return OrderItemDto.builder()
                .id(orderItem.getId())
                .productId(orderItem.getProduct().getId())
                .productName(orderItem.getProduct().getName())
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .productName(orderItem.getProductName())
                .productImage(orderItem.getProductImage())
                .build();
    }

    @Transactional
    public void cancelOrder(Long orderId) {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new ProductNotFoundException("Order not found: " + orderId));
            orderRepository.delete(order);
        } catch (Exception e) {
            log.error("Error canceling order: ", e);
            throw new RuntimeException("Error canceling order: " + e.getMessage(), e);
        }
    }

    public List<OrderDto> getAllOrders() {
        try {
            return orderRepository.findAll().stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error getting all orders: ", e);
            throw new RuntimeException("Error getting all orders: " + e.getMessage(), e);
        }
    }

    public BigDecimal getTotalRevenue() {
        try {
            return orderRepository.findAll().stream()
                    .map(Order::getTotalAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        } catch (Exception e) {
            log.error("Error calculating total revenue: ", e);
            throw new RuntimeException("Error calculating total revenue: " + e.getMessage(), e);
        }
    }


    // status changes
    @Transactional
    public OrderDto updateOrderStatus(Long orderId, String newStatus) {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new ProductNotFoundException("Order not found: " + orderId));
            order.setPaymentStatus(newStatus);
            Order updatedOrder = orderRepository.save(order);
            return convertToDto(updatedOrder);
        } catch (Exception e) {
            log.error("Error updating order status: ", e);
            throw new RuntimeException("Error updating order status: " + e.getMessage(), e);
        }
    }


//    @Transactional
//    public OrderDto updateOrderStatus(Long orderId, String newStatus) {
//        try {
//            Order order = orderRepository.findById(orderId)
//                    .orElseThrow(() -> new ProductNotFoundException("Order not found: " + orderId));
//            order.setPaymentStatus(newStatus);
//            Order updatedOrder = orderRepository.save(order);
//            return convertToDto(updatedOrder);
//        } catch (Exception e) {
//            log.error("Error updating order status: ", e);
//            throw new RuntimeException("Error updating order status: " + e.getMessage(), e);
//        }
//    }
}