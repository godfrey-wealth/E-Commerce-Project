package com.example.ecommerceshoppingcart.persistence;

import com.example.ecommerceshoppingcart.persistence.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByNameContaining(String name);



    boolean existsByName(String name);

    boolean existsByQuantity(Integer quantity);
}