package com.chatapp.service;

import com.chatapp.exception.ServiceException;
import com.chatapp.model.Entity;
import com.chatapp.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminEntityService {

    @Autowired
    private EntityRepository entityRepository;

    public Optional<Entity> getEntityByAdminId(String adminId) {
        return entityRepository.findByAdminId(adminId);
    }

    public Entity updateEntityInfo(String adminId, Entity updatedData) {
        Entity entity = entityRepository.findByAdminId(adminId)
                .orElseThrow(() -> new ServiceException("Entity not found for Admin ID: " + adminId));

        entity.setName(updatedData.getName());
        entity.setDescription(updatedData.getDescription());
        return entityRepository.save(entity);
    }

    public Entity addITAdmin(String adminId, String itAdminId) {
        Entity entity = entityRepository.findByAdminId(adminId)
                .orElseThrow(() -> new ServiceException("Entity not found for Admin ID: " + adminId));

        if (!entity.getItAdminIds().contains(itAdminId)) {
            entity.getItAdminIds().add(itAdminId);
        }
        return entityRepository.save(entity);
    }

    public Entity removeITAdmin(String adminId, String itAdminId) {
        Entity entity = entityRepository.findByAdminId(adminId)
                .orElseThrow(() -> new ServiceException("Entity not found for Admin ID: " + adminId));

        entity.getItAdminIds().remove(itAdminId);
        return entityRepository.save(entity);
    }
}
