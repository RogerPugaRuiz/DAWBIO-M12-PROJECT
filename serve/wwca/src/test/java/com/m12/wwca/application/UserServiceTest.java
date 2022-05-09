package com.m12.wwca.application;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.Message;
import com.m12.wwca.domain.entity.Role;
import com.m12.wwca.infrastructure.persistence.MessageRepoMysqlAdapter;
import com.m12.wwca.infrastructure.persistence.RoleRepoMysqlAdapter;
import com.m12.wwca.infrastructure.persistence.UserRepoMysqlAdapter;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    private Logger logger = LoggerFactory.getLogger(UserServiceTest.class);

    @Test
    void testFindMessageById() {

    }

    @Test
    void testGetMessages() {

    }

    @Test
    void testSaveMessage() {

    }

    @Test
    void testAddUser() {
        AppUser appUser = new AppUser.Builder()
                .username("roger22")
                .email("roger@gmail.com")
                .password("roger1234")
                .role(roleService.getRole("admin"))
                .build();
        AppUser user = userService.getUserByUsername(appUser.getUsername());

        userService.deleteUser(user);

        userService.addUser(appUser);
        if (userService.getUserByUsername("roger22") != null) {
            System.out.println("User added");
            assert true;
        } else {
            System.out.println("User not added");
            assert false;
        }
    }
}
