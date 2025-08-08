package com.chatapp.repository;

import com.chatapp.model.Entity;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EntityRepository extends MongoRepository<Entity, String> {
	Optional<Entity> findByAdminId(String adminId);
	Optional<Entity> findByItAdminIdsContaining(String itAdminId);


}
