package com.chatapp.service;

import com.chatapp.model.Entity;
import com.chatapp.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EntityService {

    @Autowired
    private EntityRepository entityRepository;

    public Entity createEntity(Entity entity) {
        return entityRepository.save(entity);
    }

    public Optional<Entity> getEntityById(String id) {
        return entityRepository.findById(id);
    }
}
