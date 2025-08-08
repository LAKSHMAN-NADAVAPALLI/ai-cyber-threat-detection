package com.cybersecurity.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class EnvironmentLogger {

    @Autowired
    private Environment environment;

    @PostConstruct
    public void printProperties() {
        System.out.println("✔ spring.data.mongodb.uri = " + environment.getProperty("spring.data.mongodb.uri"));
    }
}
