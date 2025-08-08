package com.chatapp.dto;

import lombok.Data;

@Data
public class AssignAdminRequest {
    private String superAdminId;
    private String email;
    private String name;
    private String entityId;
}
