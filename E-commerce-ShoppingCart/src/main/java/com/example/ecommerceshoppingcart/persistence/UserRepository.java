package com.example.ecommerceshoppingcart.persistence;


import com.example.ecommerceshoppingcart.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByFirstname(String firstname);

    boolean existsByLastname(String lastname);

    boolean existsByAddress(String address);

    boolean existsByContactDetails(String contactDetails);
}
