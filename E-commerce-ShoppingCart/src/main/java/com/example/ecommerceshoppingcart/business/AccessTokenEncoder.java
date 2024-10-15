package com.example.ecommerceshoppingcart.business;


import com.example.ecommerceshoppingcart.dto.AccessTokenDTO;

public interface AccessTokenEncoder {
    String encode(AccessTokenDTO accessToken);
}
