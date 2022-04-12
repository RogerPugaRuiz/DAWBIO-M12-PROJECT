package com.m12.wwca.application;

import javax.transaction.Transactional;

import com.m12.wwca.domain.Role;
import com.m12.wwca.domain.repo.RoleRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public class RoleService {

    @Autowired
    private RoleRepo roleRepo; // RoleRepoMysqlAdapter

    // Logger debug
    private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

    @Transactional
    /**
     * Add a new role
     * @param role
     */
    public void addRole(Role role) {
        // info add new role
        logger.info("add new role: " + role.getName());
        roleRepo.addRole(role);
    }

    @Transactional
    /**
     * Get a role by name
     * @param name
     * @return Role
     */
    public Role getRole(String name) {
        // info get role by name
        logger.info("get role by name: " + name);
        return roleRepo.getRole(name);
    }

    @Transactional
    /**
     * Delete a role by name
     * @param name
     */
    public void deleteRole(String name) {
        // info delete role by name
        logger.info("delete role by name: " + name);
        roleRepo.deleteRole(name);
    }

    @Transactional
    /**
     * Update a role name
     * @param name
     * @param newName
     */
    public void updateRole(String name, String newName) {
        // info update role name
        logger.info("update role name: " + name + " to " + newName);
        roleRepo.updateRole(name, newName);
    }

    @Transactional
    /**
     * Get all roles
     * @return List<Role>
     */
    public List<Role> getRoles() {
        // info get all roles
        logger.info("get all roles");
        return roleRepo.getRoles();
    }
}
