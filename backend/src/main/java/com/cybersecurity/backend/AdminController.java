package com.cybersecurity.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(
		  origins = {
		    "http://localhost:3000",
		    "https://nadavapalli-lakshman-ai-cyber-threat-detection.vercel.app"
		  },
		  allowedHeaders = "*",
		  exposedHeaders = "Authorization"
		)

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private JwtUtil jwtUtil;

   
        private boolean isAdmin(String token) {
            return jwtUtil.validateToken(token) && "ADMIN".equalsIgnoreCase(jwtUtil.extractRole(token));
        }

        // ✅ Get all users
        @GetMapping("/users")
        public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String authHeader) {
            String token = authHeader.replace("Bearer ", "");
            if (!isAdmin(token)) return ResponseEntity.status(403).body("Access denied: Admins only");
            return ResponseEntity.ok(userRepository.findAll());
        }

        // ✅ Get user by ID
        @GetMapping("/users/{id}")
        public ResponseEntity<?> getUserById(@PathVariable String id, @RequestHeader("Authorization") String authHeader) {
            String token = authHeader.replace("Bearer ", "");
            if (!isAdmin(token)) return ResponseEntity.status(403).body("Access denied");
            return userRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        // ✅ Update user
        @PutMapping("/users/{id}")
        public ResponseEntity<?> updateUser(@PathVariable("id") String id,
                                            @RequestBody User updatedUser,
                                            @RequestHeader("Authorization") String authHeader) {
            try {
                System.out.println("==> PUT /users/" + id + " called");

                // Step 1: Check if Authorization header exists and is valid
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    System.out.println("Authorization header is missing or invalid");
                    return ResponseEntity.status(401).body("Missing or invalid Authorization header");
                }

                String token = authHeader.substring(7); // Remove "Bearer " prefix
                System.out.println("Token received: " + token);

                // Step 2: Check if user is admin
                if (!isAdmin(token)) {
                    System.out.println("Access denied: user is not admin");
                    return ResponseEntity.status(403).body("Access denied: Admin privileges required");
                }

                // Step 3: Debugging incoming user data
                System.out.println("Updated user data received:");
                System.out.println("Name: " + updatedUser.getName());
                System.out.println("Email: " + updatedUser.getEmail());
                System.out.println("Role: " + updatedUser.getRole());

                // Step 4: Look up user by ID
                return userRepository.findById(id).map(existingUser -> {
                    System.out.println("User found with ID: " + id);

                    // Step 5: Validate incoming fields
                    if (updatedUser.getName() == null || updatedUser.getEmail() == null || updatedUser.getRole() == null) {
                        System.out.println("Invalid input: one or more fields are null");
                        return ResponseEntity.badRequest().body("Invalid user data");
                    }

                    // Step 6: Update fields
                    existingUser.setName(updatedUser.getName());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setRole(updatedUser.getRole());

                    userRepository.save(existingUser);
                    System.out.println("User updated successfully");

                    return ResponseEntity.ok(existingUser);

                }).orElseGet(() -> {
                    System.out.println("User not found with ID: " + id);
                    return ResponseEntity.status(404).body("User not found");
                });

            } catch (Exception e) {
                System.out.println("Exception occurred:");
                e.printStackTrace();
                return ResponseEntity.status(500).body("Server error while updating user");
            }
        }


        @DeleteMapping("/delete/users/{id}")
        public ResponseEntity<?> deleteUser(@PathVariable("id") String id,
                                            @RequestHeader("Authorization") String authHeader) {
            String token = authHeader.replace("Bearer ", "");
            if (!isAdmin(token)) return ResponseEntity.status(403).body("Access denied");

            if (!userRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }

            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        }


    // ✅ Search/Filter Users by Role or Keyword
    @GetMapping("/users/search")
    public ResponseEntity<?> searchUsers(@RequestParam(required = false) String role,
                                         @RequestParam(required = false) String keyword,
                                         @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!isAdmin(token)) return ResponseEntity.status(403).body("Access denied");

        List<User> users = userRepository.findAll();

        if (role != null && !role.isEmpty()) {
            users = users.stream()
                    .filter(u -> u.getRole().equalsIgnoreCase(role))
                    .collect(Collectors.toList());
        }

        if (keyword != null && !keyword.isEmpty()) {
            String lowerKeyword = keyword.toLowerCase();
            users = users.stream()
                    .filter(u -> u.getName().toLowerCase().contains(lowerKeyword) || u.getEmail().toLowerCase().contains(lowerKeyword))
                    .collect(Collectors.toList());
        }

        return ResponseEntity.ok(users);
    }

    // ✅ Post a Job (on behalf of employer)
    @PostMapping("/jobs")
    public ResponseEntity<?> postJob(@RequestBody Job job,
                                     @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!isAdmin(token)) return ResponseEntity.status(403).body("Access denied");

        job.setPostedBy("ADMIN");
        jobRepository.save(job);
        return ResponseEntity.ok("Job posted successfully");
    }

    // ✅ Broadcast Notification
    @PostMapping("/broadcast")
    public ResponseEntity<?> broadcastNotification(@RequestBody Notification notification,
                                                   @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!isAdmin(token)) return ResponseEntity.status(403).body("Access denied");

        notification.setSender("ADMIN");
        notificationRepository.save(notification);
        return ResponseEntity.ok("Notification broadcasted successfully");
    }

    // ✅ Basic Analytics Overview (Stub Example)
    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!isAdmin(token)) return ResponseEntity.status(403).body("Access denied");

        long totalUsers = userRepository.count();
        long employers = userRepository.findAll().stream().filter(u -> "Employer".equalsIgnoreCase(u.getRole())).count();
        long jobSeekers = userRepository.findAll().stream().filter(u -> "JobSeeker".equalsIgnoreCase(u.getRole())).count();
        long totalJobs = jobRepository.count();

        return ResponseEntity.ok(new AnalyticsResponse(totalUsers, employers, jobSeekers, totalJobs));
    }
    
 // Add this inside AdminController
    @GetMapping("/recent-threats")
    public ResponseEntity<?> getRecentThreats(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!isAdmin(token)) return ResponseEntity.status(403).body("Access denied");

        // Example hardcoded threat predictions
        List<ThreatPrediction> threats = List.of(
            new ThreatPrediction("Suspicious login detected", "Phishing", 92.4, "2025-05-21 10:30"),
            new ThreatPrediction("High traffic on port 445", "DDoS", 88.2, "2025-05-21 09:50")
        );

        return ResponseEntity.ok(threats);
    }

 // Place this inside AdminController or as a separate file
    public static class ThreatPrediction {
        private String input;
        private String prediction;
        private double confidence;
        private String timestamp;

        public ThreatPrediction(String input, String prediction, double confidence, String timestamp) {
            this.input = input;
            this.prediction = prediction;
            this.confidence = confidence;
            this.timestamp = timestamp;
        }

        // Getters (required for JSON serialization)
        public String getInput() { return input; }
        public String getPrediction() { return prediction; }
        public double getConfidence() { return confidence; }
        public String getTimestamp() { return timestamp; }
    }

    // Inner class for analytics response
    
    
    static class AnalyticsResponse {
        public long totalUsers;
        public long totalEmployers;
        public long totalJobSeekers;
        public long totalJobs;

        public AnalyticsResponse(long totalUsers, long totalEmployers, long totalJobSeekers, long totalJobs) {
            this.totalUsers = totalUsers;
            this.totalEmployers = totalEmployers;
            this.totalJobSeekers = totalJobSeekers;
            this.totalJobs = totalJobs;
        }
    }
}
