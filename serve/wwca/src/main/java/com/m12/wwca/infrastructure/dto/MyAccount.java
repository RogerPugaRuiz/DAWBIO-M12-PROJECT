package com.m12.wwca.infrastructure.dto;

import com.m12.wwca.domain.entity.AppUser;

public class MyAccount {

    private String id;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private String description;

    public MyAccount(Builder builder) {
        this.username = builder.username;
        this.email = builder.email;
        this.firstname = builder.firstname;
        this.lastname = builder.lastname;
        this.description = builder.description;
        this.id = builder.id;
    }

    public MyAccount(){}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    /**
     * Builder for the class
     */
    public static class Builder {
        private String id;
        private String username;
        private String email;
        private String firstname;
        private String lastname;
        private String description;

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder firstname(String firstname) {
            this.firstname = firstname;
            return this;
        }

        public Builder lastname(String lastname) {
            this.lastname = lastname;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder id(String id){
            this.id = id;
            return this;
        }

        public Builder from(AppUser user) {
            this.username = user.getUsername();
            this.email = user.getEmail();
            this.firstname = user.getFirstname();
            this.lastname = user.getLastname();
            this.description = user.getDescription();
            this.id = user.getId();
            return this;
        }

        public MyAccount build() {
            return new MyAccount(this);
        }

        

    }

}
