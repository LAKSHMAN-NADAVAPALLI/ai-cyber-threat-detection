package com.cybersecurity.backend;


import com.cybersecurity.backend.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
 Optional<User> findByEmail(String email);
}
