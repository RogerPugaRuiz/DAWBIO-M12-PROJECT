package com.m12.wwca.domain;

import java.util.UUID;

import org.junit.jupiter.api.Test;

public class AppUserTest {
    private static final String USERNAME = "username";
    private static final String EMAIL = "email@example.com";
    private static final String PASSWORD = "password";
    private static final String ID = UUID.randomUUID().toString();
    private AppUser appUser;

    public AppUserTest(){
        appUser = new AppUser.Builder()
                .id(ID)
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
    void testGetId() {
        assert appUser.getId().equals(ID);
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
    void testSetId() {
        String id = UUID.randomUUID().toString();;
        appUser.setId(id);
        assert appUser.getId().equals(id);
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


    @Test
    void testToString() {
        String expected = "AppUser [email=" + EMAIL + ", id=" + ID + ", password=" + PASSWORD + ", username=" + USERNAME + "]";
        assert appUser.toString().equals(expected);
    }
}
