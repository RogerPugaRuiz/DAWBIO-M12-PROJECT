package com.m12.wwca.infrastructure.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.deser.impl.ExternalTypeHandler.Builder;
import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.Role;

public class ProfileDto {
    // username of the user. Must be unique
    private String username;

    // email of the user. It must be unique
    private String email;

    // date of subscription
    private Role role;

    // date of subscription
    private LocalDateTime subscribed;

    // date of last login
    private LocalDateTime lastLogin;

    public ProfileDto(AppUser user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.subscribed = user.getSubscribed();
        this.lastLogin = user.getLastLogin();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role.getName();
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getSubscribed() {
        return subscribed;
    }

    public void setSubscribed(LocalDateTime subscribed) {
        this.subscribed = subscribed;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    
}
