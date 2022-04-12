package com.m12.wwca.infrastructure.mapper.dto;

import java.time.LocalDateTime;

import com.m12.wwca.domain.AppUser;
import com.m12.wwca.infrastructure.mapper.RoleMapper;
import com.m12.wwca.infrastructure.mapper.exception.InvalidMapperException;
import com.m12.wwca.infrastructure.shared.MapperFactory;


/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public class UserDto {
    // username of the user. Must be unique
    private String username;

    // email of the user. It must be unique
    private String email;

    // password of the user. It must be encrypted
    private String password;

    // date of subscription
    private RoleDto role;

    // date of subscription
    private LocalDateTime subscribed;
    

    /**
     * Constructor with parameters
     * @param AppUser user
     */
    public UserDto(AppUser user){
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.subscribed = user.getSubscribed();

        try {
            this.role = (RoleDto) MapperFactory.getMapper(RoleMapper.class).map(RoleDto.class, user.getRole());
        } catch (InvalidMapperException e) {
            // TODO Auto-generated catch block
            this.role = null;
            e.printStackTrace();
        }
    }

    /**
     * Getter for the username
     * @return username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Setter for the username
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Getter for the email
     * @return email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Setter for the email
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Getter for the password
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Setter for the password
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Getter for the role
     * @return role
     */
    public String getRole() {
        return role.getName();
    }

    /**
     * Setter for the role
     * @param role
     */
    public void setRole(RoleDto roleDto) {
        this.role = roleDto;
    }

    /**
     * Getter for the subscribed
     * @return subscribed
     */
    public LocalDateTime getSubscribed(){
        return subscribed;
    }

    /**
     * Setter for the subscribed
     * @param subscribed
     */
    public void setSubscribed(LocalDateTime subscribed){
        this.subscribed = subscribed;
    }   
    

}
