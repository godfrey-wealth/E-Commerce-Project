
package com.example.ecommerceshoppingcart.dto;

import com.example.ecommerceshoppingcart.persistence.entity.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleDto {
    private Long id;
    private RoleEnum name;
}