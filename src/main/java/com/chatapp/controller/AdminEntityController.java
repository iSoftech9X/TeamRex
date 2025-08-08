package com.chatapp.controller;

import com.chatapp.model.Entity;
import com.chatapp.service.AdminEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin/entity")
@CrossOrigin("*")
public class AdminEntityController {

    @Autowired
    private AdminEntityService adminEntityService;

    // 1. View own entity
    @GetMapping("/{adminId}")
    public Optional<Entity> getOwnEntity(@PathVariable String adminId) {
        return adminEntityService.getEntityByAdminId(adminId);
    }

    // 2. Update entity name/description
    @PutMapping("/{adminId}")
    public Entity updateEntity(@PathVariable String adminId, @RequestBody Entity updatedEntity) {
        return adminEntityService.updateEntityInfo(adminId, updatedEntity);
    }

    // 3. Add IT Admin to entity
    @PutMapping("/{adminId}/add-itadmin")
    public Entity addITAdmin(@PathVariable String adminId, @RequestParam String itAdminId) {
        return adminEntityService.addITAdmin(adminId, itAdminId);
    }

    // 4. Remove IT Admin from entity
    @PutMapping("/{adminId}/remove-itadmin")
    public Entity removeITAdmin(@PathVariable String adminId, @RequestParam String itAdminId) {
        return adminEntityService.removeITAdmin(adminId, itAdminId);
    }
}
