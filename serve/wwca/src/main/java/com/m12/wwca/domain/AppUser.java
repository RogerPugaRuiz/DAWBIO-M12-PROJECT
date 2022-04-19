package com.m12.wwca.domain;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


import javax.persistence.GenerationType;

@Entity
/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public class AppUser {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id; // id for hibernate

    @Column(nullable=false, unique = true)
    private String username; // username of the user. Must be unique

    @Column(nullable=false, unique = true)
    private String email; // email of the user. It must be unique

    @Column(nullable=false)
    private String password; // password of the user. It must be encrypted

    @Column(nullable = false)
    private LocalDateTime subscribed = LocalDateTime.now(); // date of subscription

    @ManyToOne
    private Role role; // role of the user (admin, user, etc)
    /**
     * Constructor with parameters
     * @param builder
     */
    public AppUser (Builder builder) {
        this.id = UUID.randomUUID().toString();
        this.username = builder.username;
        this.email = builder.email;
        this.password = builder.password;
        this.role = builder.role;
    }

    /**
     * Default constructor
     */
    public AppUser(){
        this.id = UUID.randomUUID().toString();
    }

    /**
     * Getter for the id
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * getter for the username
     * @return username
     */
    public String getUsername() {
        return username;
    }
    

    /**
     * getter for the email
     * @return email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Getter for the password
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Getter for the role
     * @return role
     */
    public Role getRole() {
        return role;
    }

    /**
     * getter for the subscribed
     * @return subscribed
     */
    public LocalDateTime getSubscribed(){
        return subscribed;
    }

    /**
     * Setter for the username
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Setter for the email
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Setter for the password
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Setter for the role
     * @param Role
     */
    public void setRole(Role role) {
        this.role = role;
    }

    // public void setSubscribed(LocalDateTime subscribed){
    //     this.subscribed = subscribed;
    // }

    @Override
    /**
     * toString method
     */
    public String toString() {
        return "AppUser [email=" + email + ", id=" + id + ", password=" + password + ", username=" + username + "]";
    }


    /**
     * Builder class
     */
    public static class Builder{
        private String id;
        private String username;
        private String email;
        private String password;
        private Role role;

        /**
         * Default constructor
         */
        public Builder(){
        }

        /**
         * Constructor with parameters
         * @param user
         */
        public Builder(AppUser user){
            this.id = user.getId();
            this.username = user.getUsername();
            this.email = user.getEmail();
            this.password = user.getPassword();
            this.role = user.getRole();
        }

        /**
         * username setter
         * @param username
         * @return Builder
         */
        public Builder username(String username) {
            this.username = username;
            return this;
        }

        /**
         * email setter
         * @param email
         * @return Builder
         */
        public Builder email(String email) {
            this.email = email;
            return this;
        }

        /**
         * password setter
         * @param password
         * @return Builder
         */
        public Builder password(String password) {
            this.password = password;
            return this;
        }

        /**
         * role setter
         * @param role
         * @return Builder
         */
        public Builder role(Role role) {
            this.role = role;
            return this;
        }

        /**
         * build method. It returns an AppUser object
         * @return AppUser
         */
        public AppUser build() {
            AppUser user = new AppUser(this);
            validateObject(user); // if the object is invalid, it throws an exception with the message
            return user;
        }

        /**
         * Validate the object
         * @param user
         */
        public void validateObject(AppUser user){

            passValidated(user); // validate the password. If it is not valid, it throws an exception with the message

            emailValidated(user); // validate the email. If it is not valid, it throws an exception with the message

            usernameValidated(user); // validate the username. If it is not valid, it throws an exception with the message

            idValidated(user); // validate the id. If it is not valid, it throws an exception with the message
        }

        /**
         * Validate the username
         * @param user
         * @throws IllegalArgumentException
         */
        private void usernameValidated(AppUser user) {
            // if the username is null or empty, it throws an exception with the message
            Pattern pattern = Pattern.compile("[a-zA-Z0-9]{3,}");
            Matcher matcher = pattern.matcher(user.getUsername());
            if (matcher.matches() == false) {
                throw new IllegalArgumentException("name must contain [a-zA-Z0-9]");
            }

            // if the username is less than 3 characters and contain special characters, it throws an exception with the message
            if (user.getUsername() == null || user.getUsername().isEmpty()){
                throw new IllegalArgumentException("Username cannot be empty");
            }
        }

        /**
         * Validate the password
         * @param user
         * @throws IllegalArgumentException
         */
        private void passValidated(AppUser user){
            // if the password is null or empty, it throws an exception with the message
            if (user.getPassword() == null || user.getPassword().isEmpty()){
                throw new IllegalArgumentException("Password cannot be empty");
            }
        }

        /**
         * Validate the email
         * @param user
         * @throws IllegalArgumentException
         */
        private void emailValidated(AppUser user){

            // if the email is null or empty, it throws an exception with the message
            if (user.getEmail() == null || user.getEmail().isEmpty()){
                throw new IllegalArgumentException("Email cannot be empty");
            }

            // if the email is not valid, it throws an exception with the message
            Pattern pattern = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
            if (pattern.matcher(user.getEmail()).matches() == false) {
                throw new IllegalArgumentException("Email is not valid");
            }
        }

        /**
         * Validate the id
         * @param user
         * @throws IllegalArgumentException
         */
        private void idValidated(AppUser user){
            // if the id is null or empty, it throws an exception with the message
            if (user.getId() == null || user.getId().isEmpty()){
                throw new IllegalArgumentException("Id cannot be empty");
            }
        }
    }

    
}
