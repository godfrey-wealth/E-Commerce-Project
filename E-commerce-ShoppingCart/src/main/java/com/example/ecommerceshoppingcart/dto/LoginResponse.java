
package com.example.ecommerceshoppingcart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private long userId;
    private String token;
    private UserDto user;

    private List<String> roles;
    private String accessToken;
    private String refreshToken;
}