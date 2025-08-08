package com.chatapp.dto;

import lombok.Data;

@Data
public class AssignItAdminRequest {
    private String superAdminId;
    private String name;
    private String email;
    private String entityId;
}
