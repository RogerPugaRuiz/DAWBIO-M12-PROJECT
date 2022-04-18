package com.m12.wwca.domain;

import java.util.UUID;

import org.junit.jupiter.api.Test;

public class AppUser_BuilderTest {
    private static final String USERNAME = "Ab01";
    private static final String EMAIL = "emailuser@example.com";
    private static final String PASSWORD = "password";

    private AppUser appUser;

    public AppUser_BuilderTest() {
        appUser = new AppUser.Builder()
                .username(USERNAME)
                .email(EMAIL)
                .password(PASSWORD)
                .role(new Role("user"))
                .build();
    }

    @Test
    void testBuild() {
        assert appUser.getEmail().equals(EMAIL) &&
                appUser.getPassword().equals(PASSWORD) &&
                appUser.getUsername().equals(USERNAME) &&
                appUser.getRole().toString().equals("user");
    }

    @Test
    void testEmail() {
        assert appUser.getEmail().equals(EMAIL);
    }

    @Test
    void testPassword() {
        assert appUser.getPassword().equals(PASSWORD);
    }

    @Test
    void testUsername() {
        assert appUser.getUsername().equals(USERNAME);
    }

    @Test
    void testRole() {
        assert appUser.getRole().toString().equals("user");
    }

    @Test
    void testCopy() {
        final String newEmail = "email_user2@example.com";
        final String newPassword = "new password";
        final String newUsername = "newusername";
        final Role newRole = new Role("new role");
        AppUser newAppUser = new AppUser.Builder()
                .username(newUsername)
                .password(newPassword)
                .email(newEmail)
                .role(newRole)
                .build();

        AppUser appUser2 = new AppUser.Builder(newAppUser).build();
        assert appUser2.getEmail().equals(newEmail) &&
                appUser2.getPassword().equals(newPassword) &&
                appUser2.getUsername().equals(newUsername) &&
                appUser2.getRole().toString().equals("new role");
    }
}
