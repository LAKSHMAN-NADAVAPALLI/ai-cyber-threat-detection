package com.cybersecurity.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.cybersecurity.backend")
public class BackendApplication {

    @Value("${spring.data.mongodb.uri:Not Configured}")
    private String mongoUri; // ✅ Not static

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @PostConstruct
    public void printMongoUri() {
        System.out.println("✅ Mongo URI: " + mongoUri);

        // ✅ Optional: extract DB name from URI
        String dbName = extractDatabaseName(mongoUri);
        System.out.println("📂 Detected MongoDB database name: " + dbName);
    }

    private String extractDatabaseName(String uri) {
        try {
            // Extract DB name from URI string
            String path = uri.split(".mongodb.net/")[1];
            if (path.contains("?")) {
                return path.substring(0, path.indexOf('?'));
            }
            return path;
        } catch (Exception e) {
            return "Unknown or Missing";
        }
    }
}
