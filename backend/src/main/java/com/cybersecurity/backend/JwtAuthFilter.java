package com.cybersecurity.backend;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Check if the Authorization header exists and starts with "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);  // Extract token

            try {
                // Validate the token
                if (jwtUtil.validateToken(token)) {
                    String email = jwtUtil.extractEmail(token);

                    // Load user details using email from the token
                    var userDetails = userService.loadUserByUsername(email); // UserDetailsService

                    if (userDetails != null) {
                        // If user is valid, set authentication in SecurityContext
                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails, null, userDetails.getAuthorities()
                                );

                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);

                        // Optionally, log authentication success (ensure no sensitive data like email is logged)
                        System.out.println("✅ Authentication successful for user: " + email);
                    }
                }
            } catch (Exception e) {
                // Log error and respond with an appropriate message
                System.err.println("⚠️ JWT Authentication error: " + e.getMessage());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  // Set 401 Unauthorized
                response.getWriter().write("Invalid or expired token");
                return;  // Stop further filter chain processing if the token is invalid
            }
        }

        // Continue with the next filter if no JWT was provided or it's valid
        filterChain.doFilter(request, response);
    }
}
