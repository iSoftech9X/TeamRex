package com.chatapp.repository;

import com.chatapp.model.Team;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TeamRepository extends MongoRepository<Team, String> {
    List<Team> findByEntityId(String entityId);
}
