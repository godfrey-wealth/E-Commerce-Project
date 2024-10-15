

package com.example.ecommerceshoppingcart.controller;

import com.example.ecommerceshoppingcart.business.Impl.CartService;
import com.example.ecommerceshoppingcart.configuration.exception.UserNotFoundWithIDException;
import com.example.ecommerceshoppingcart.dto.AddToCartRequest;
import com.example.ecommerceshoppingcart.dto.CartDto;
import com.example.ecommerceshoppingcart.dto.UpdateCartRequest;
import com.example.ecommerceshoppingcart.security.auth.isauthenticated.isAuthenticated;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class CartController {
    private final CartService cartService;

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER"})
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserCart(@PathVariable Long userId) {
        try {
            List<CartDto> cart = cartService.getUserCart(userId);
            return ResponseEntity.ok(cart);
        } catch (UserNotFoundWithIDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user cart: " + e.getMessage());
        }
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER"})
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequest request) {
        if (request.getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID cannot be null");
        }
        try {
            CartDto cartDto = cartService.addToCart(request.getUserId(), request.getProductId(), request.getQuantity());
            return ResponseEntity.ok(cartDto);
        } catch (UserNotFoundWithIDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding item to cart: " + e.getMessage());
        }
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER"})
    @PutMapping("/{cartId}")
    public ResponseEntity<?> updateCartItem(@PathVariable Long cartId, @RequestBody UpdateCartRequest request) {
        try {
            CartDto updatedCart = cartService.updateCartItem(cartId, request.getQuantity());
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating cart item: " + e.getMessage());
        }
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER"})
    @DeleteMapping("/{cartId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long cartId) {
        try {
            cartService.removeFromCart(cartId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing item from cart: " + e.getMessage());
        }
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER"})
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> clearUserCart(@PathVariable Long userId) {
        try {
            cartService.clearUserCart(userId);
            return ResponseEntity.noContent().build();
        } catch (UserNotFoundWithIDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error clearing user cart: " + e.getMessage());
        }
    }
}