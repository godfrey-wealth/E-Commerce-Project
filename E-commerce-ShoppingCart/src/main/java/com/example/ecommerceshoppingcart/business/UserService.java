package com.example.ecommerceshoppingcart.business;



import com.example.ecommerceshoppingcart.dto.*;

import java.util.List;
import java.util.Optional;

public interface UserService {
    LoginResponse login(LoginRequest loginRequest);
    SignUpResponse signUp(SignUpRequest signUpRequest);
   // UserDto getUserById(Long id);
    UserDto updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
    Optional<UserDto> getUserById(Long id);

    UserDto getUserByUsername(String username);

    // get All users
    List<UserDto> getAllUsers();
}