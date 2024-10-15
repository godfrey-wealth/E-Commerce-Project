package com.example.ecommerceshoppingcart.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;



@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_role")
@Entity
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull

    @Column(name = "role_name")
    @Enumerated(EnumType.STRING)
    private RoleEnum name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;


}

