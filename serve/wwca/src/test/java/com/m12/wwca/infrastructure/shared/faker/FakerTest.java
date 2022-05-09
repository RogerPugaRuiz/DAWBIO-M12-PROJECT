package com.m12.wwca.infrastructure.shared.faker;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import com.google.gson.JsonSyntaxException;
import com.m12.wwca.application.RoleService;
import com.m12.wwca.application.UserService;
import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.infrastructure.shared.Cryptography;
import com.m12.wwca.infrastructure.shared.Utils;
import com.m12.wwca.infrastructure.shared.faker.obj.User;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
public class FakerTest {

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    Logger logger = LoggerFactory.getLogger(FakerTest.class);

    @Test
    void testGetUsers() {
        Faker faker;
        try {
            faker = new Faker();
            User[] users = faker.getUsers();
            for (User user : users) {
                AppUser appUser = new AppUser.Builder()
                        .username(user.name)
                        .email(user.email)
                        .password(user.password)
                        .role(roleService.getRole("user"))
                        .build();
                if (userService.getUserByUsername(user.name) == null) {
                    userService.addUser(appUser);
                } else {
                    userService.deleteUser(userService.getUserByUsername(appUser.getUsername()));
                    userService.addUser(appUser);
                }
            }
            assert users.length > 0;

        } catch (JsonSyntaxException | IOException e) {
            // TODO Auto-generated catch block
            assert false;
        }
    }

    @Test
    void testPassword() {
        Faker faker;
        try {
            faker = new Faker();
            
            User[] users = faker.getUsers();
            User first_user = users[0];
           
            String expectedPassword = Cryptography.sha256(first_user.password);
            String actualPassword = userService.getUserByUsername(first_user.name).getPassword();
            actualPassword = Cryptography.decrypt(actualPassword);
            logger.info("Expected password: " + expectedPassword);
            logger.info("Actual password: " + actualPassword);

            assert expectedPassword.equals(actualPassword);

        } catch (JsonSyntaxException | IOException e) {
            // TODO Auto-generated catch block
           logger.error(e.getMessage());
            assert false;
        }

    }
}
