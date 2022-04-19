package com.m12.wwca.infrastructure.shared;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import com.m12.wwca.domain.AppUser;
import com.m12.wwca.infrastructure.dto.UserDto;

public class Utils {
    /**
     * Check if id is an email
     * 
     * @param id
     * @return true if id is an email
     */
    public static boolean isAnEmail(String id) {

        // pattern for email
        Pattern pattern = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        // check if id is an email
        return pattern.matcher(id).matches();
    }

    /**
     * Convert a list of users to a list of userDto
     * 
     * @param users
     * @return List<UserDto>
     * @throws InvalidMapperException
     */
    public static List<UserDto> usersToDto(List<AppUser> users) {
        List<UserDto> usersDto = new ArrayList<>();
        for (AppUser user : users) {
            // UserDto userDto = (UserDto)
            // MapperFactory.getMapper(UserMapper.class).map(UserDto.class, user);
            UserDto userDto = appUserToUserDto(user);
            usersDto.add(userDto);
        }
        return usersDto;
    }

    public static UserDto appUserToUserDto(AppUser user) {
        UserDto userDto = new UserDto.Builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole().getName())
                .subscribed(user.getSubscribed())
                .build();
        return userDto;
    }

}
