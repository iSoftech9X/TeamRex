package com.chatapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String id;
    private String username;
    private String email;
    private String role; 
    private String timezone;
    private String status;
    private String createdAt;
}
