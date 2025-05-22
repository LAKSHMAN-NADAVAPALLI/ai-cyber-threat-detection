package com.cybersecurity.backend;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000","nadavapalli-lakshman-ai-cyber-threat-detection.vercel.app"})
@RestController
public class BackendController {

    @GetMapping("/test")
    public String testEndpoint() {
        return "Backend is working!";
    }

    @GetMapping("/ai-test")
    public String callAIServer() {
        RestTemplate restTemplate = new RestTemplate();
        String aiUrl = "https://ai-cyber-threat-detection.onrender.com/test";
        ResponseEntity<String> response = restTemplate.getForEntity(aiUrl, String.class);
        return "Response from AI: " + response.getBody();
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeThreat(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Map<String, String> input) {
        try {
            String userInput = input.get("input");
            System.out.println("📥 Input received from frontend: " + userInput);
            System.out.println("🔐 Received Token: " + authHeader);

            RestTemplate restTemplate = new RestTemplate();
            String aiUrl = "https://ai-cyber-threat-detection.onrender.com/predict";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // ✅ Forward the token if it exists
            if (authHeader != null && !authHeader.isEmpty()) {
                headers.set("Authorization", authHeader);
            }

            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("input", userInput);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(aiUrl, request, Map.class);

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("error", "AI service unavailable.");
            return ResponseEntity.status(500).body(error);
        }
    }

}
