

package com.example.ecommerceshoppingcart.controller;

import com.example.ecommerceshoppingcart.business.Impl.OrderService;
import com.example.ecommerceshoppingcart.config.exception.UserNotFoundWithIDException;
import com.example.ecommerceshoppingcart.configuration.CustomeException;
import com.example.ecommerceshoppingcart.dto.CreateOrderRequest;
import com.example.ecommerceshoppingcart.dto.OrderDto;


import com.example.ecommerceshoppingcart.security.auth.isauthenticated.isAuthenticated;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class OrderController {
    private final OrderService orderService;

//    @isAuthenticated
//    @RolesAllowed({"ROLE_CUSTOMER"})
//    @PostMapping
//    public ResponseEntity<OrderDto> createOrder(@RequestBody CreateOrderRequest request) throws UserNotFoundWithIDException {
//        return ResponseEntity.ok(orderService.createOrder(request.getUserId(), request.getDiscountCode()));
//    }

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER"})
    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody CreateOrderRequest request) {
        try {
            OrderDto createdOrder = orderService.createOrder(request);
            return ResponseEntity.ok(createdOrder);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new OrderDto()); // You might want to create a proper error response DTO
        }
    }
//    @PostMapping
//    public ResponseEntity<OrderDto> createOrder(@RequestBody CreateOrderRequest request) throws UserNotFoundWithIDException {
//        return ResponseEntity.ok(orderService.createOrder(request));
//    }

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_ADMIN"})
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDto>> getUserOrders(@PathVariable Long userId) throws UserNotFoundWithIDException {
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN" })
    @GetMapping("/all")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_ADMIN" })
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }


    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN"})
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable Long orderId, @RequestBody UpdateOrderStatusRequest request) {
        String newStatus = request.getStatus();
        try {
            OrderDto updatedOrder = orderService.updateOrderStatus(orderId, newStatus);
            return ResponseEntity.ok(updatedOrder);
        } catch (CustomeException.InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);  // Invalid status
        } catch (Exception e) {
            e.printStackTrace();  // Logging the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new OrderDto());
        }
    }

    public static class UpdateOrderStatusRequest {
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }


}
