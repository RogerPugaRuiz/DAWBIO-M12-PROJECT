package com.m12.wwca.infrastructure.dto;

import com.m12.wwca.domain.entity.Role;

/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public class RoleDto {
    // name of the role
    private String name;

    /**
     * Constructor with parameters
     * @param role
     * 
     */
    public RoleDto(Role role) {
        this.name = role.getName();
    }

    public RoleDto(String name) {
        this.name = name;
    }
    
    /**
     * Getter for the name
     * @return name
     */
    public String getName() {
        return name;
    }
}
