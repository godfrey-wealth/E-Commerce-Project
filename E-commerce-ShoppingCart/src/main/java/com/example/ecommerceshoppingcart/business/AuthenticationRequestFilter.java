package com.example.ecommerceshoppingcart.business;
//
//
//
//import com.example.ecommerceshoppingcart.config.exception.InvalidAccessTokenException;
//import com.example.ecommerceshoppingcart.dto.AccessTokenDTO;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//public class AuthenticationRequestFilter extends OncePerRequestFilter {
//    private final static String SPRING_SECURITY_ROLE_PREFIX = "ROLE_";
//
//    @Autowired
//    private AccessTokenDecoder accessTokenDecoder;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        final String requestTokenHeader = request.getHeader("Authorization");
//        if (requestTokenHeader == null || !requestTokenHeader.startsWith("Bearer ")){
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String accessToken = requestTokenHeader.substring(7);
//
//        try {
//            AccessTokenDTO accessTokenDTO = accessTokenDecoder.decode(accessToken);
//            setupSpringSecurityContext(accessTokenDTO);
//            filterChain.doFilter(request, response);
//        }
//        catch (InvalidAccessTokenException ex){
//            logger.error("Error validating access token", ex);
//            sendAuthenticationError(response);
//        }
//    }
//
//    private void sendAuthenticationError(HttpServletResponse response) throws IOException{
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        response.flushBuffer();
//    }
//
//    private void setupSpringSecurityContext(AccessTokenDTO accessTokenDTO){
//        UserDetails userDetails = new User(accessTokenDTO.getSubject(), "",
//                accessTokenDTO.getRoles()
//                        .stream()
//                        .map(role -> new SimpleGrantedAuthority(SPRING_SECURITY_ROLE_PREFIX + role))
//                        .toList());
//
//        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
//                userDetails, null, userDetails.getAuthorities());
//        usernamePasswordAuthenticationToken.setDetails(accessTokenDTO);
//        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//    }
//
//
//}





// New Version



import com.example.ecommerceshoppingcart.business.AccessTokenDecoder;
import com.example.ecommerceshoppingcart.config.exception.InvalidAccessTokenException;
import com.example.ecommerceshoppingcart.dto.AccessTokenDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthenticationRequestFilter extends OncePerRequestFilter {
    private final static String SPRING_SECURITY_ROLE_PREFIX = "ROLE_";

    @Autowired
    private AccessTokenDecoder accessTokenDecoder;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");
        if (requestTokenHeader == null || !requestTokenHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = requestTokenHeader.substring(7);

        try {
            AccessTokenDTO accessTokenDTO = accessTokenDecoder.decode(accessToken);
            setupSpringSecurityContext(accessTokenDTO);
            filterChain.doFilter(request, response);
        } catch (InvalidAccessTokenException ex) {
            logger.error("Error validating access token", ex);
            sendAuthenticationError(response);
        }
    }

    private void sendAuthenticationError(HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"Invalid or expired token\"}");
        response.flushBuffer();
    }

    private void setupSpringSecurityContext(AccessTokenDTO accessTokenDTO) {
        UserDetails userDetails = new User(accessTokenDTO.getSubject(), "",
                accessTokenDTO.getRoles()
                        .stream()
                        .map(role -> new SimpleGrantedAuthority(SPRING_SECURITY_ROLE_PREFIX + role))
                        .toList());

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken.setDetails(accessTokenDTO);
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }
}