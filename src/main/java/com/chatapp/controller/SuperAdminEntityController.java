package com.chatapp.controller;

import com.chatapp.model.Entity;
import com.chatapp.service.SuperAdminEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/superadmin/entities")
@CrossOrigin("*")
public class SuperAdminEntityController {

    @Autowired
    private SuperAdminEntityService entityService;
 
    // 1. Create a new entity
    @PostMapping
    public Entity createEntity(@RequestBody Entity entity) {
        return entityService.createEntity(entity);
    }

    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    @GetMapping("/entities")
    public List<Entity> getAllEntities() {
        return entityService.getAllEntities();
    }
//    @GetMapping
//    public List<Entity> getAllEntities() {
//        return entityService.getAllEntities();
//    }

    // 3. Get entity by ID
    @GetMapping("/{id}")
    public Optional<Entity> getEntityById(@PathVariable String id) {
        return entityService.getEntityById(id);
    }

    // 4. Deactivate an entity
    @PutMapping("/{id}/deactivate")
    public Entity deactivateEntity(@PathVariable String id) {
        return entityService.deactivateEntity(id);
    }

    // 5. Assign Admin to Entity
    @PutMapping("/{id}/assign-admin")
    public Entity assignAdmin(@PathVariable String id, @RequestParam String adminId) {
        return entityService.assignAdmin(id, adminId);
    }
}
