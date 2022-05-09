package com.m12.wwca.infrastructure.shared;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UtilsTest {

    Logger logger = LoggerFactory.getLogger(UtilsTest.class);

    @Test
    void testGenerateRandomPassword() {
        String password_1 = Utils.generateRandomPassword(20);
        String password_2 = Utils.generateRandomPassword(20);

        assert !password_1.equals(password_2);
    }
}
