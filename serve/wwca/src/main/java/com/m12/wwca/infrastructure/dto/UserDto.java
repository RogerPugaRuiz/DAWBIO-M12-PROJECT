package com.m12.wwca.infrastructure.dto;

import java.time.LocalDateTime;

import com.m12.wwca.domain.AppUser;

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
     * 
     * @param Builder build
     */
    public UserDto(Builder build) {
        this.username = build.username;
        this.email = build.email;
        this.password = build.password;
        this.role = build.role;
        this.subscribed = build.subscribed;
    }

    /**
     * Getter for the username
     * 
     * @return username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Setter for the username
     * 
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Getter for the email
     * 
     * @return email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Setter for the email
     * 
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Getter for the password
     * 
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Setter for the password
     * 
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Getter for the role
     * 
     * @return role
     */
    public String getRole() {
        return role.getName();
    }

    /**
     * Setter for the role
     * 
     * @param role
     */
    public void setRole(RoleDto roleDto) {
        this.role = roleDto;
    }

    /**
     * Getter for the subscribed
     * 
     * @return subscribed
     */
    public LocalDateTime getSubscribed() {
        return subscribed;
    }

    /**
     * Setter for the subscribed
     * 
     * @param subscribed
     */
    public void setSubscribed(LocalDateTime subscribed) {
        this.subscribed = subscribed;
    }

    /**
     * Builder class
     * 
     * @author Roger Puga Ruiz
     * @version 1.0
     * @since 14/04/2022
     *
     */
    public static class Builder {
        private String username;
        private String email;
        private String password;
        private RoleDto role;
        private LocalDateTime subscribed;

        /**
         * Default constructor
         *
         */
        public Builder() {
        }

        /**
         * Constructor with other UserDto
         */
        public Builder(UserDto userDto) {
            this.username = userDto.getUsername();
            this.email = userDto.getEmail();
            this.password = userDto.getPassword();
            this.role = new RoleDto(userDto.getRole());
            this.subscribed = userDto.getSubscribed();
        }

        /**
         * Setter for the username
         * 
         * @param username
         * @return Builder
         */
        public Builder username(String username) {
            this.username = username;
            return this;
        }

        /**
         * Setter for the email
         * 
         * @param email
         * @return Builder
         */
        public Builder email(String email) {
            this.email = email;
            return this;
        }

        /**
         * Setter for the password
         * 
         * @param password
         * @return Builder
         */
        public Builder password(String password) {
            this.password = password;
            return this;
        }

        /**
         * Setter for the role
         * 
         * @param role
         * @return Builder
         */
        public Builder role(String role) {
            this.role = new RoleDto(role);
            return this;
        }

        /**
         * Setter for the subscribed
         * 
         * @param subscribed
         * @return Builder
         */
        public Builder subscribed(LocalDateTime subscribed) {
            this.subscribed = subscribed;
            return this;
        }

        /**
         * Build method
         * 
         * @return UserDto
         */
        public UserDto build() {
            return new UserDto(this);
        }
    }

}
