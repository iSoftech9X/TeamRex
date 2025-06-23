package com.chatapp.controller;

import com.chatapp.model.Entity;
import com.chatapp.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/workspaces")
@CrossOrigin("*")
public class EntityController {

    @Autowired
    private EntityService entityService;

    @PostMapping
    public Entity createEntity(@RequestBody Entity entity) {
        return entityService.createEntity(entity);
    }

    @GetMapping("/{id}")
    public Optional<Entity> getEntityById(@PathVariable String id) {
        return entityService.getEntityById(id);
    }
}
