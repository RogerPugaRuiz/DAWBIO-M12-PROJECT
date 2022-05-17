package com.m12.wwca.infrastructure.shared.jwt;

import com.m12.wwca.application.UserService;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class JWTokenTest {

    @Autowired
    private UserService userService;

    Logger logger = LoggerFactory.getLogger(JWTokenTest.class);

    @Test
    void testGetJWT() {
        UserJWT jwt = new UserJWT();
        String jws = jwt.getJWT(userService.getUserByUsername("awrenlf"));
        logger.info("jwt: " + jws);
        assert jws.length() > 0;
    }
}
