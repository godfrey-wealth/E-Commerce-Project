
package com.example.ecommerceshoppingcart.business.Impl;

import com.example.ecommerceshoppingcart.config.exception.ProductNotFoundException;
import com.example.ecommerceshoppingcart.configuration.exception.UserNotFoundWithIDException;
import com.example.ecommerceshoppingcart.dto.CartDto;
import com.example.ecommerceshoppingcart.persistence.CartRepository;
import com.example.ecommerceshoppingcart.persistence.ProductRepository;
import com.example.ecommerceshoppingcart.persistence.UserRepository;
import com.example.ecommerceshoppingcart.persistence.entity.Cart;
import com.example.ecommerceshoppingcart.persistence.entity.Product;
import com.example.ecommerceshoppingcart.persistence.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<CartDto> getUserCart(Long userId) throws UserNotFoundWithIDException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundWithIDException("User not found with ID: " + userId));
        return cartRepository.findByUser(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CartDto addToCart(Long userId, Long productId, Integer quantity) throws UserNotFoundWithIDException {
        if (userId == null || productId == null || quantity == null) {
            throw new IllegalArgumentException("UserId, ProductId, and Quantity must not be null");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundWithIDException("User not found with ID: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + productId));

        Cart cart = cartRepository.findByUserAndProduct(user, product)
                .orElse(Cart.builder()
                        .user(user)
                        .product(product)
                        .quantity(0)
                        .name(product.getName())
                        .image(product.getImage())
                        .status("Pending")
                        .build());

        cart.setQuantity(cart.getQuantity() + quantity);
        cart.setItemTotal(product.getPrice().multiply(BigDecimal.valueOf(cart.getQuantity())));

        Cart savedCart = cartRepository.save(cart);
        return convertToDto(savedCart);
    }

    @Transactional
    public CartDto updateCartItem(Long cartId, Integer quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ProductNotFoundException("Cart item not found with ID: " + cartId));
        cart.setQuantity(quantity);
        cart.setItemTotal(cart.getProduct().getPrice().multiply(BigDecimal.valueOf(quantity)));
        Cart updatedCart = cartRepository.save(cart);
        return convertToDto(updatedCart);
    }

    @Transactional
    public void removeFromCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    private CartDto convertToDto(Cart cart) {
        return CartDto.builder()
                .id(cart.getId())
                .productId(cart.getProduct().getId())
                .quantity(cart.getQuantity())
                .name(cart.getName())
                .image(cart.getImage())
                .status(cart.getStatus())
                .itemTotal(cart.getItemTotal())
                .build();
    }

    public CartDto getCartItemById(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ProductNotFoundException("Cart item not found with ID: " + cartId));
        return convertToDto(cart);
    }

    @Transactional
    public void clearUserCart(Long userId) throws UserNotFoundWithIDException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundWithIDException("User not found with ID: " + userId));
        List<Cart> userCart = cartRepository.findByUser(user);
        cartRepository.deleteAll(userCart);
    }

    public BigDecimal getCartTotal(Long userId) throws UserNotFoundWithIDException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundWithIDException("User not found with ID: " + userId));
        List<Cart> userCart = cartRepository.findByUser(user);
        return userCart.stream()
                .map(Cart::getItemTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}