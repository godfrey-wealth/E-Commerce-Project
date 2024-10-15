package com.example.ecommerceshoppingcart.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Builder
//@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AccessTokenDTO {
    private String subject;
    private List<String> roles;
    private Long userId;

    private String firstname;
    private Instant expirationTime;

    @JsonIgnore
    public boolean hasRole(String roleName) {
        if (roles == null) {
            return false;
        }
        return roles.contains(roleName);
    }
}
