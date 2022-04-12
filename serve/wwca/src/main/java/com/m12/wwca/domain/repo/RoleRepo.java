package com.m12.wwca.domain.repo;

import com.m12.wwca.domain.Role;

import java.util.List;

public interface RoleRepo {
    public void addRole(Role role); // Add a new role
    public Role getRole(String name); // Get a role by name
    public void deleteRole(String name); // Delete a role by name
    public void updateRole(String name, String newName); // Update a role name
    public List<Role> getRoles(); // Get all roles
}
