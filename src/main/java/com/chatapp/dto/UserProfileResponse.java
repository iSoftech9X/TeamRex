package com.chatapp.dto;

import com.chatapp.model.Role;

import java.util.Date;

public class UserProfileResponse {
    private String id;
    private Role role;
    private String username;
    private String email;
    private String status;
    private String avatarUrl;
    private String timezone;
    private Date createdAt;
    private String companyId;

    public UserProfileResponse() {}

    public UserProfileResponse(String id, Role role, String username, String email, String status,
                               String avatarUrl, String timezone, Date createdAt, String companyId) {
        this.id = id;
        this.role = role;
        this.username = username;
        this.email = email;
        this.status = status;
        this.avatarUrl = avatarUrl;
        this.timezone = timezone;
        this.createdAt = createdAt;
        this.companyId = companyId;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public String getCompanyId() { return companyId; }
    public void setCompanyId(String companyId) { this.companyId = companyId; }
}
