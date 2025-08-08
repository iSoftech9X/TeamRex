package com.chatapp.service;

import com.chatapp.exception.ServiceException;
import com.chatapp.model.Entity;
import com.chatapp.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ITAdminEntityService {

    @Autowired
    private EntityRepository entityRepository;

    public Optional<Entity> getEntityByITAdminId(String itAdminId) {
        return entityRepository.findByItAdminIdsContaining(itAdminId);
    }

    public List<String> getAllITAdmins(String itAdminId) {
        Entity entity = entityRepository.findByItAdminIdsContaining(itAdminId)
                .orElseThrow(() -> new ServiceException("Entity not found for IT Admin ID: " + itAdminId));

        return entity.getItAdminIds();
    }
}
