package com.cybersecurity.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = {"http://localhost:3000","nadavapalli-lakshman-ai-cyber-threat-detection.vercel.app"}) // Adjust for deployment
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;  // Inject the JwtUtil

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        String email = user.getEmail().toLowerCase();
        user.setEmail(email);

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return "User already exists";
        }

        // Set role (admin or user)
        if (user.getRole() == null) {
            user.setRole("user");  // Default role for normal users
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User registered successfully!";
    }


    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginUser) {
        String email = loginUser.getEmail() != null ? loginUser.getEmail().toLowerCase() : "";

        if (email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        if (loginUser.getPassword() == null || loginUser.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            boolean passwordMatches = passwordEncoder.matches(loginUser.getPassword(), user.get().getPassword());

            if (passwordMatches) {
                // Generate JWT token with both email and role
                String token = jwtUtil.generateToken(email, user.get().getRole());  // Pass both email and role

                return ResponseEntity.ok()
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .body("Login successful!");
            }
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }



}