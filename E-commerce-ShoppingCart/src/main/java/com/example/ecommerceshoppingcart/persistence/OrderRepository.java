package com.example.ecommerceshoppingcart.persistence;


import com.example.ecommerceshoppingcart.persistence.entity.Order;
import com.example.ecommerceshoppingcart.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}