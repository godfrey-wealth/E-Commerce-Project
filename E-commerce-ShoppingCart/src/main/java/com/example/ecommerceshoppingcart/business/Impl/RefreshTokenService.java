

package com.example.ecommerceshoppingcart.business.Impl;

import com.example.ecommerceshoppingcart.business.AccessTokenEncoder;
import com.example.ecommerceshoppingcart.dto.AccessTokenDTO;
import com.example.ecommerceshoppingcart.persistence.UserRepository;
import com.example.ecommerceshoppingcart.persistence.RefreshTokenRepository;
import com.example.ecommerceshoppingcart.persistence.entity.RefreshToken;
import com.example.ecommerceshoppingcart.persistence.entity.RoleEnum;
import com.example.ecommerceshoppingcart.persistence.entity.User;
import com.example.ecommerceshoppingcart.persistence.entity.UserRole;
import com.example.ecommerceshoppingcart.config.exception.InvalidAccessTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RefreshTokenService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private AccessTokenEncoder accessTokenEncoder;

    @Value("${jwt.refresh.expiration}")
    private long refreshTokenDurationMs;

    @Transactional
    public String createRefreshToken(Long userId) {
        RefreshToken refreshToken = new RefreshToken();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Delete any existing refresh tokens for this user
        refreshTokenRepository.deleteByUser(user);

        refreshToken.setUser(user);
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken.getToken();
    }

    @Transactional
    public String refreshToken(String refreshToken) {
        return refreshTokenRepository.findByToken(refreshToken)
                .map(this::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    AccessTokenDTO accessTokenDTO = AccessTokenDTO.builder()
                            .userId(user.getId())
                            .subject(user.getUsername())
                            .roles(user.getUserRoles().stream()
                                    .map(UserRole::getName)
                                    .map(RoleEnum::name)
                                    .collect(Collectors.toList()))
                            .firstname(user.getFirstname())
                            .build();
                    return accessTokenEncoder.encode(accessTokenDTO);
                })
                .orElseThrow(() -> new InvalidAccessTokenException("Invalid refresh token"));
    }

    private RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new InvalidAccessTokenException("Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    @Transactional
    public int deleteByUserId(Long userId) {
        return refreshTokenRepository.deleteByUser(userRepository.findById(userId).orElse(null));
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Transactional
    public RefreshToken verifyAndRefreshExpiration(String token) {
        RefreshToken refreshToken = findByToken(token)
                .orElseThrow(() -> new InvalidAccessTokenException("Refresh token not found in database"));

        return verifyExpiration(refreshToken);
    }
}