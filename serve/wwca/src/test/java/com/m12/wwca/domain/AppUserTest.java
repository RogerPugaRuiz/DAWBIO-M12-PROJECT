package com.m12.wwca.domain;

import java.util.UUID;

import org.junit.jupiter.api.Test;

public class AppUserTest {
    private static final String USERNAME = "username";
    private static final String EMAIL = "email@example.com";
    private static final String PASSWORD = "password";
    private AppUser appUser;

    public AppUserTest(){
        appUser = new AppUser.Builder()
                .username(USERNAME)
                .email(EMAIL)
                .password(PASSWORD)
                .role(new Role("user"))
                .build();
    }

    @Test
    void testGetEmail() {
        assert appUser.getEmail().equals(EMAIL);
    }


    @Test
    void testGetPassword() {
        assert appUser.getPassword().equals(PASSWORD);
    }

    @Test
    void testGetUsername() {
        assert appUser.getUsername().equals(USERNAME);
    }

    @Test
    void testSetEmail() {
        String email = "new email";
        appUser.setEmail(email);
        assert appUser.getEmail().equals(email);
    }

    @Test
    void testSetPassword() {
        String password = "new password";
        appUser.setPassword(password);
        assert appUser.getPassword().equals(password);
    }

    @Test
    void testSetUsername() {
        String username = "new username";
        appUser.setUsername(username);
        assert appUser.getUsername().equals(username);
    }

    @Test
    void testSetRole() {
        Role role = new Role("admin");
        role.setId(0l);
        role.setName("admin");
        appUser.setRole(role);
        assert appUser.getRole().equals(role);
    }

    @Test
    void testGetRole() {
        assert appUser.getRole() != null;
    }
}
