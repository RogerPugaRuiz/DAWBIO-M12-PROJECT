package com.m12.wwca.infrastructure.persistence;

import javax.transaction.Transactional;

import com.m12.wwca.domain.entity.Role;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RoleRepoMysqlAdapterTest {

    @Autowired
    private RoleRepoMysqlAdapter roleRepoMysqlAdapter;

    Logger logger = LoggerFactory.getLogger(RoleRepoMysqlAdapterTest.class);

    @Test
    @Transactional
    void testAddRole() {
        Role role = new Role("admin");
        roleRepoMysqlAdapter.addRole(role);
        logger.info("add new role: " + role.getName());
    }

    @Test
    void testDeleteRole() {

    }

    @Test
    @Transactional
    void testGetRole() {

        Role role = roleRepoMysqlAdapter.getRole("user");
        logger.info("role: " + role.getName());
    }

    @Test
    void testGetRoles() {


    }

    @Test
    void testUpdateRole() {

    }
}
