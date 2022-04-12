package com.m12.wwca.infrastructure.shared;

import com.m12.wwca.domain.AppUser;
import com.m12.wwca.domain.Role;
import com.m12.wwca.infrastructure.mapper.Mapper;
import com.m12.wwca.infrastructure.mapper.RoleMapper;
import com.m12.wwca.infrastructure.mapper.UserMapper;

/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public class MapperFactory {

    /**
     * get the mapper for the class
     * @param clazz type of the object to map
     * @return Mapper of the clazz or null if the clazz is not supported
     * 
     */
    public static Mapper getMapper(Class<?> clazz) {
        // if the clazz is RoleMapper.class
        if (clazz.equals(RoleMapper.class)) {
            return new RoleMapper();
        }
        // if the clazz is UserMapper.class
        if (clazz.equals(UserMapper.class)) {
            return new UserMapper();
        }

        // if the clazz is not RoleMapper.class or UserMapper.class
        return null;
    }
}
