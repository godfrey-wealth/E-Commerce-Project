
package com.example.ecommerceshoppingcart.business.Impl;

import com.example.ecommerceshoppingcart.business.AccessTokenEncoder;
import com.example.ecommerceshoppingcart.business.UserService;
import com.example.ecommerceshoppingcart.config.exception.InvalidCredentialsException;

import com.example.ecommerceshoppingcart.config.exception.UserAlreadyExistsException;
import com.example.ecommerceshoppingcart.dto.*;

import com.example.ecommerceshoppingcart.persistence.UserRepository;
import com.example.ecommerceshoppingcart.persistence.entity.User;
import com.example.ecommerceshoppingcart.persistence.entity.UserRole;
import com.example.ecommerceshoppingcart.persistence.entity.RoleEnum;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;


    private final PasswordEncoder passwordEncoder;


    private final AccessTokenEncoder accessTokenEncoder;

    private final RefreshTokenService refreshTokenService;


    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername());

        if (user == null) {
            throw new InvalidCredentialsException();
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        List<String> roles = user.getUserRoles().stream()
                .map(userRole -> userRole.getName().toString())
                .collect(Collectors.toList());

        Long userId = user.getId();

        String accessToken = accessTokenEncoder.encode(AccessTokenDTO.builder()
                .subject(user.getUsername())
                .userId(userId)
                .roles(roles)
                .firstname(user.getFirstname())
                .build());

        return LoginResponse.builder()
                .userId(userId)
                .roles(roles)
                .accessToken(accessToken)
                .build();
    }

//    @Override
//    public LoginResponse login(LoginRequest request) {
//        User user = userRepository.findByUsername(request.getUsername());
//
//        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//            throw new InvalidCredentialsException();
//        }
//
//        List<String> roles = user.getUserRoles().stream()
//                .map(userRole -> userRole.getName().toString())
//                .collect(Collectors.toList());
//
//        String accessToken = accessTokenEncoder.encode(AccessTokenDTO.builder()
//                .subject(user.getUsername())
//                .userId(user.getId())
//                .roles(roles)
//                .firstname(user.getFirstname())
//                .build());
//
//        String refreshToken = refreshTokenService.createRefreshToken(user.getId());
//
//        return LoginResponse.builder()
//                .userId(user.getId())
//                .roles(roles)
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .build();
//    }


    @Override
    public SignUpResponse signUp(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email already in use");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("Username already in use");
        }
        if(userRepository.existsByAddress(request.getAddress())) {
            throw new UserAlreadyExistsException("Address already in use");

        }
        if(userRepository.existsByContactDetails(request.getContactDetails())) {
            throw new UserAlreadyExistsException("Contact Details already in use");
        }

        User newUser = saveNewUser(request);
        return SignUpResponse.builder()
                .message("User registered successfully")
                .user(convertToDto(newUser))
                .build();
    }

    private User saveNewUser(SignUpRequest request) {
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User newUser = User.builder()
                .email(request.getEmail())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .username(request.getUsername())
                .password(encodedPassword)
                .userImages(request.getUserImages())
                .address(request.getAddress())
                .contactDetails(request.getContactDetails())
                .build();
        newUser.setUserRoles(Set.of(UserRole.builder().user(newUser).name(RoleEnum.CUSTOMER).build()));
        return userRepository.save(newUser);
    }

    @Override
    public Optional<UserDto> getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToDto);
    }

    @Override
    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return user != null ? convertToDto(user) : null;
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());

        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    private UserDto convertToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .username(user.getUsername())
                .email(user.getEmail())
                .userImages(user.getUserImages())
                .address(user.getAddress())
                .contactDetails(user.getContactDetails())
                .userRoles(user.getUserRoles().stream()
                        .map(this::convertToRoleDto)
                        .collect(Collectors.toSet()))
                .build();
    }

    private UserRoleDto convertToRoleDto(UserRole userRole) {
        return UserRoleDto.builder()
                .id(userRole.getId())
                .name(userRole.getName())
                .build();
    }
}