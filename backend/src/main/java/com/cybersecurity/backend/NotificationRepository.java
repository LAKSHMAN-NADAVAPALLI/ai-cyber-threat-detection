package com.cybersecurity.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    // Custom query methods can go here if needed
}
