package com.example.ecommerceshoppingcart.persistence;

import com.example.ecommerceshoppingcart.persistence.entity.Cart;
import com.example.ecommerceshoppingcart.persistence.entity.Product;
import com.example.ecommerceshoppingcart.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(User user);

    Optional<Cart> findByUserAndProduct(User user, Product product);
}
