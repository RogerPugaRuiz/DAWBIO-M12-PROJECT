package com.m12.wwca.infrastructure.mapper.dto;

import java.time.LocalDateTime;

import com.m12.wwca.infrastructure.dto.RoleDto;
import com.m12.wwca.infrastructure.dto.UserDto;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class UserDtoTest {
    private static UserDto userDto;
    private static final String username = "username";
    private static final String email = "example@gmail.com";
    private static final String password = "password";
    private static final RoleDto roleDto = new RoleDto("test");

    
    public UserDtoTest(){
        userDto = new UserDto.Builder()
                .username(username)
                .email(email)
                .password(password)
                .role(roleDto.getName())
                .build();
        
    }


    @Test
    void testGetEmail() {
        assert userDto.getEmail().equals(email);
    }

    @Test
    void testGetPassword() {
        assert userDto.getPassword().equals(password);
    }

    @Test
    void testGetRole() {
        assert userDto.getRole().equals(roleDto.getName());
    }

    @Test
    void testGetUsername() {
        assert userDto.getUsername().equals(username);
    }

    @Test
    void testSetEmail() {
        String email = "newemail@example.com";
        userDto.setEmail(email);
        assert userDto.getEmail().equals(email);
    }

    @Test
    void testSetPassword() {
        String password = "newpassword";
        userDto.setPassword(password);
        assert userDto.getPassword().equals(password);
    }

    @Test
    void testSetRole() {
        RoleDto roleDto = new RoleDto("admin");
        userDto.setRole(roleDto);
        assert userDto.getRole().equals(roleDto.getName());
    }

    @Test
    void testSetSubscribed() {
        LocalDateTime subscribed = LocalDateTime.now();
        userDto.setSubscribed(subscribed);
        assert userDto.getSubscribed().equals(subscribed);
    }

    @Test
    void testSetUsername() {
        String username = "newusername";
        userDto.setUsername(username);
        assert userDto.getUsername().equals(username);
    }
}
