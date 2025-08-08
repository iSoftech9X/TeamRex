package com.chatapp.controller;

import com.chatapp.model.Entity;
import com.chatapp.service.ITAdminEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/itadmin/entity")
@CrossOrigin("*")
public class ITAdminEntityController {

    @Autowired
    private ITAdminEntityService itAdminEntityService;

    // 1. Get entity by IT Admin ID
    @GetMapping("/{itAdminId}")
    public Optional<Entity> getEntityByITAdminId(@PathVariable String itAdminId) {
        return itAdminEntityService.getEntityByITAdminId(itAdminId);
    }

    // 2. View list of IT Admins in the same entity
    @GetMapping("/{itAdminId}/itadmins")
    public Iterable<String> getAllITAdmins(@PathVariable String itAdminId) {
        return itAdminEntityService.getAllITAdmins(itAdminId);
    }
}
