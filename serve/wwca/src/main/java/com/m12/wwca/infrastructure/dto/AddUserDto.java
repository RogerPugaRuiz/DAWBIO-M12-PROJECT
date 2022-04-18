package com.m12.wwca.infrastructure.dto;

/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 14/04/2022
 */
public class AddUserDto {
    private String username;
    private String email;
    private String password;
    private String confirmPassword;

    /**
     * Default constructor
     */
    public AddUserDto() {
    }

    /**
     * Constructor with builder
     * 
     * @param builder
     *
     */
    public AddUserDto(Builder builder) {
        this.username = builder.username;
        this.email = builder.email;
        this.password = builder.password;
        this.confirmPassword = builder.confirmPassword;
    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    /**
     * Builder class
     * 
     * @author Roger Puga Ruiz
     * @version 1.0
     * @since 14/04/2022
     */
    public static class Builder {
        private String username;
        private String email;
        private String password;
        private String confirmPassword;

        /**
         * Default constructor
         */
        public Builder() {
        }

        /**
         * Constructor with other UserDto
         */
        public Builder(AddUserDto addUserDto) {
            this.username = addUserDto.getUsername();
            this.email = addUserDto.getEmail();
            this.password = addUserDto.getPassword();
            this.confirmPassword = addUserDto.getConfirmPassword();
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
         * Setter for the confirmPassword
         * 
         * @param confirmPassword
         * @return Builder
         */
        public Builder confirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
            return this;
        }

        /**
         * Build the object
         * 
         * @return AddUserDto
         */
        public AddUserDto build() {
            return new AddUserDto(this);
        }
    }

}
