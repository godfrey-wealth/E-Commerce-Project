
package com.example.ecommerceshoppingcart.controller;

import com.example.ecommerceshoppingcart.business.UserService;
import com.example.ecommerceshoppingcart.config.exception.userNotFoundException;
import com.example.ecommerceshoppingcart.dto.*;

import com.example.ecommerceshoppingcart.security.auth.isauthenticated.isAuthenticated;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000/" , allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;
    private final AccessTokenDTO accessTokenDTO;

    public UserController(AccessTokenDTO accessTokenDTO) {
        this.accessTokenDTO = accessTokenDTO;
    }

//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
//        return ResponseEntity.ok(userService.login(loginRequest));
//    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(userService.signUp(signUpRequest));
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Get All Users

    //@Secured("ROLE_ADMIN")
    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }


    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER_SERVICE", "ROLE_CUSTOMER"})
    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUser()throws userNotFoundException {//@PathVariable(value = "id") final long id
        final Optional<UserDto> userOptional = userService.getUserById(accessTokenDTO.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return  ResponseEntity.ok().body(userOptional.get()); //ResponseEntity.ok().body(userOptional.get());
    }

//    @GetMapping("/profile")
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER_SERVICE', 'ROLE_CUSTOMER')")
////@isAuthenticated
////@RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER_SERVICE", "ROLE_CUSTOMER"})
////@GetMapping("/profile")
//    public ResponseEntity<UserDto> getUserProfile(@AuthenticationPrincipal AccessTokenDTO accessTokenDTO) {
//        return userService.getUserById(accessTokenDTO.getUserId())
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }

}