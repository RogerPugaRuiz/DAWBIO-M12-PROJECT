package com.m12.wwca.domain.repo;

import java.util.List;

import com.m12.wwca.domain.entity.Role;

public interface RoleRepo {
    public void addRole(Role role); // Add a new role
    public Role getRole(String name); // Get a role by name
    public void deleteRole(String name); // Delete a role by name
    public void updateRole(String name, String newName); // Update a role name
    public List<Role> getRoles(); // Get all roles
}
