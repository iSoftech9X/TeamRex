package com.chatapp.repository;

import com.chatapp.model.Entity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EntityRepository extends MongoRepository<Entity, String> {
}
