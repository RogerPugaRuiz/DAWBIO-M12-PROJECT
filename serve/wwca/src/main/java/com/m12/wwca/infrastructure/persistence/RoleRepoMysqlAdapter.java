package com.m12.wwca.infrastructure.persistence;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.m12.wwca.domain.Role;
import com.m12.wwca.domain.repo.RoleRepo;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 * 
 */
public class RoleRepoMysqlAdapter implements RoleRepo{
    @PersistenceContext
    // EntityManager is a container-managed entity manager
    private EntityManager entityManager;

    @Override
    /**
     * Add a new role
     * @param role
     */
    public void addRole(Role role) {
        entityManager.persist(role);
    }

    @Override
    /**
     * Get a role by name
     * @param name
     * @return Role
     */
    public Role getRole(String name) {
        Role auxRole = entityManager.createQuery("SELECT r FROM Role r WHERE r.name = :name", Role.class)
                .setParameter("name", name)
                .getSingleResult();
        return auxRole;
    }

    @Override
    /**
     * Delete a role by name
     * @param name
     */
    public void deleteRole(String name) {
        Role auxRole = getRole(name);
        entityManager.remove(auxRole);
    }

    @Override
    /**
     * Update a role
     * @param name
     * @param newName
     */
    public void updateRole(String name, String newName) {
        Role auxRole = getRole(name);
        auxRole.setName(newName);
        entityManager.merge(auxRole);
    }

    @Override
    /**
     * Get all roles
     * @return List<Role>
     */
    public List<Role> getRoles() {
        return entityManager.createQuery("SELECT r FROM Role r", Role.class).getResultList();
    }

    
    
}
