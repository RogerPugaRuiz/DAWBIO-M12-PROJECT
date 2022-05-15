package com.m12.wwca.infrastructure.persistence;

import com.m12.wwca.domain.entity.AppUser;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class UserRepoMysqlAdapterTest {


    @Autowired
    UserRepoMysqlAdapter userRepoMysqlAdapter;
    Logger logger = LoggerFactory.getLogger(UserRepoMysqlAdapterTest.class);

    @Test
    void testGetUserByEmail() {
        AppUser user = userRepoMysqlAdapter.getUserByEmail("rogerpuga@gmail.com");
        logger.info("user: " + user.getUsername());
    }

    @Test
    void testGetUserByUsername() {
        AppUser user = userRepoMysqlAdapter.getUserByUsername("andrés");
        logger.info("user: " + user.getUsername());
    }
}
