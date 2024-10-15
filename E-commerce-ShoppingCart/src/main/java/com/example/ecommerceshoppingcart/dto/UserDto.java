
package com.example.ecommerceshoppingcart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.StandardReflectionParameterNameDiscoverer;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String userImages;
    private String address;
    private String contactDetails;
    private Set<UserRoleDto> userRoles;
}