package com.example.bankingbackend.Security;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthFilter.class);

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserInfoDetailsService userDetailsService;

    private List<String> pathsToFetchDetailsBeforeLogin = Arrays.asList(
        "/api/user/login/getDebitDetails",
        "/api/user/login/getCreditDetails",
        "/api/user/login/getLoanDetails"
    );
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        
        if (path.startsWith("/api/user/login/getDebitDetails") ||
            path.startsWith("/api/user/login/getCreditDetails") ||
            path.startsWith("/api/user/login/getLoanDetails")) {
            // Paths that require fetching details before login
            LOGGER.info("Fetching details for {}", path);
        } else {
            // Paths that require JWT authentication
            LOGGER.info("Checking JWT authentication for {}", path);
        }

        // Check token from Authorization header
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String emailId = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            emailId = jwtService.getUsernameFromToken(token);
        }

        if (emailId != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(emailId);

            if (jwtService.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                LOGGER.info("JWT authentication successful for {}", emailId);
            } else {
                LOGGER.error("Invalid or expired token");
            }
        } else {
            LOGGER.info("Token missing for {}", path);
        }

        filterChain.doFilter(request, response);
    }
}