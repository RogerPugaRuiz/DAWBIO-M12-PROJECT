package com.m12.wwca.infrastructure.dto;

/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 14/04/2022
 *
 */
public class LoginUserDto {
    private String id;
    private String password;

    /**
     * Defaul constructor
     */
    public LoginUserDto() {
    }

    /**
     * Constructor with builder
     * @param builder
     *
     */
    public LoginUserDto(Builder builder) {
        this.id = builder.id;
        this.password = builder.password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    /**
     * Builder class
     *
     * @author Roger Puga Ruiz
     * @version 1.0
     * @since 14/04/2022
     *
     */
    public static class Builder{
        private String id;
        private String password;

        /**
         * Default constructor
         *
         */
        public Builder() {
        }

        /**
         * Constructor with other UserDto
         */
        public Builder(LoginUserDto loginUserDto) {
            this.id = loginUserDto.getId();
            this.password = loginUserDto.getPassword();
        }

        /**
         * Setter for the id
         *
         * @param id
         * @return Builder
         */
        public Builder id(String id) {
            this.id = id;
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
         * Build method
         *
         * @return AddUserDto
         */
        public LoginUserDto build() {
            return new LoginUserDto(this);
        }
    }


}