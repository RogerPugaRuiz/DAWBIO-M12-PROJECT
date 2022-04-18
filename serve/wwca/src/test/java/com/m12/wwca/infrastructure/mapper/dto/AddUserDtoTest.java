package com.m12.wwca.infrastructure.mapper.dto;

import com.m12.wwca.infrastructure.dto.AddUserDto;

import org.junit.jupiter.api.Test;

public class AddUserDtoTest {

    private static final String USERNAME = "username";
    private static final String EMAIL = "email@gmail.com";
    private static final String PASSWORD = "password";
    private static final String CONFIRM_PASSWORD = "password";

    private static AddUserDto addUserDto;

    public AddUserDtoTest() {
        addUserDto = new AddUserDto.Builder()
                .username(USERNAME)
                .email(EMAIL)
                .password(PASSWORD)
                .confirmPassword(CONFIRM_PASSWORD)
                .build();
    }

    @Test
    void testGetConfirmPassword() {
        assert addUserDto.getConfirmPassword().equals(CONFIRM_PASSWORD);
    }

    @Test
    void testGetEmail() {
        assert addUserDto.getEmail().equals(EMAIL);
    }

    @Test
    void testGetPassword() {
        assert addUserDto.getPassword().equals(PASSWORD);
    }

    @Test
    void testGetUsername() {
        assert addUserDto.getUsername().equals(USERNAME);
    }

    @Test
    void testSetConfirmPassword() {
        String confirmPassword = "new password";
        addUserDto.setConfirmPassword(confirmPassword);
        assert addUserDto.getConfirmPassword().equals(confirmPassword);
    }

    @Test
    void testSetEmail() {
        String email = "newe@gmail.com";
        addUserDto.setEmail(email);
        assert addUserDto.getEmail().equals(email);
    }

    @Test
    void testSetPassword() {
        String password = "newpassword";
        addUserDto.setPassword(password);
        assert addUserDto.getPassword().equals(password);
    }

    @Test
    void testSetUsername() {
        String username = "newusername";
        addUserDto.setUsername(username);
        assert addUserDto.getUsername().equals(username);
    }
}
