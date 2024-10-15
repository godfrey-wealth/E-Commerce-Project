package com.example.ecommerceshoppingcart.business;


import com.example.ecommerceshoppingcart.dto.AccessTokenDTO;

public interface AccessTokenDecoder {
    AccessTokenDTO decode(String accessTokenEncoded);
}
