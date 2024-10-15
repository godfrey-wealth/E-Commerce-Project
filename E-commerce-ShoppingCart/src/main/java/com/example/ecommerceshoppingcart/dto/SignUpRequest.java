
package com.example.ecommerceshoppingcart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String password;

    private String userImages;

    private String address;
    private String contactDetails;

    //private byte[] userImages;
}