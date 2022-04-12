package com.m12.wwca.infrastructure.mapper;

import com.m12.wwca.application.UserService;
import com.m12.wwca.domain.AppUser;
import com.m12.wwca.infrastructure.mapper.dto.UserDto;
import com.m12.wwca.infrastructure.mapper.exception.InvalidMapperException;

import org.springframework.beans.factory.annotation.Autowired;


/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 *
 */
public class UserMapper implements Mapper{

    @Autowired
    // UserService is injected by Spring
    UserService userService;


    @Override
    /**
     * Map the source object to the target object
     * @param targetClass
     * @param source
     * @return Object of the targetClass
     * @throws InvalidMapperException
     *
     */
    public Object map(Class<?> clazz, Object source) throws InvalidMapperException {
        // if the target class is AppUser.class
        if (clazz.equals(AppUser.class)){
            AppUser user = toUser((UserDto) source);
            return user;
        }
        // if the target class is UserDto.class
        if (clazz.equals(UserDto.class)){
            UserDto dto = toUserDto( (AppUser) source);
            return dto;
        }
        // if the target class is not AppUser.class or UserDto.class
        throw new InvalidMapperException("Invalid mapper");
    }

    /**
     * Convert a UserDto to a AppUser
     * @param source
     * @return AppUser
     */
    public AppUser toUser(UserDto source){
        AppUser user = userService.getUserByEmail(source.getEmail());
        return user;
    }

    /**
     * Convert a AppUser to a UserDto
     * @param source
     * @return UserDto
     *
     */
    public UserDto toUserDto(AppUser source){
        UserDto dto = new UserDto(source);
        return dto;
    }
    
}
