package com.cybersecurity.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobRepository extends MongoRepository<Job, String> {
    // You can add custom query methods here later if needed
}
