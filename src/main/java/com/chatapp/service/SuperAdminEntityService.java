package com.chatapp.service;

import com.chatapp.exception.ServiceException;
import com.chatapp.model.Entity;
import com.chatapp.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SuperAdminEntityService {

    @Autowired
    private EntityRepository entityRepository;

    public Entity createEntity(Entity entity) {
        entity.setActive(true); // default to active
        return entityRepository.save(entity);
    }

    public List<Entity> getAllEntities() {
        return entityRepository.findAll();
    }

    public Optional<Entity> getEntityById(String id) {
        return entityRepository.findById(id);
    }

    public Entity deactivateEntity(String id) {
        Entity entity = entityRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Entity not found with ID: " + id));
        entity.setActive(false);
        return entityRepository.save(entity);
    }

    public Entity assignAdmin(String entityId, String adminId) {
        Entity entity = entityRepository.findById(entityId)
                .orElseThrow(() -> new ServiceException("Entity not found with ID: " + entityId));
        entity.setAdminId(adminId);
        return entityRepository.save(entity);
    }
}