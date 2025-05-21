package com.cybersecurity.backend;



import com.cybersecurity.backend.ThreatData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ThreatDataRepository extends MongoRepository<ThreatData, String> {
    // Custom query methods if needed
}
