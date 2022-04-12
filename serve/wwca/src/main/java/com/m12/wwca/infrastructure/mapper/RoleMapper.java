package com.m12.wwca.infrastructure.mapper;

import java.util.ArrayList;
import java.util.List;

import com.m12.wwca.application.RoleService;
import com.m12.wwca.domain.Role;
import com.m12.wwca.infrastructure.mapper.dto.RoleDto;
import com.m12.wwca.infrastructure.mapper.exception.InvalidMapperException;

import org.springframework.beans.factory.annotation.Autowired;

public class RoleMapper implements Mapper{

    @Autowired
    // roleService is injected by Spring
    private RoleService roleService;

    @Override
    /**
     * Map the source object to the target object
     * @param targetClass
     * @param source
     * @return Object of the targetClass
     * @throws InvalidMapperException
     */
    public Object map(Class<?> clazz, Object source) throws InvalidMapperException {
        // if the target class is Role.class
        if (clazz.equals(Role.class)) {
            return toRole((RoleDto) source);
        }
        // if the target class is RoleDto.class
        if (clazz.equals(RoleDto.class)) {
            return toRoleDto((Role) source);
        }
        // if the target class is not Role.class or RoleDto.class
        throw new InvalidMapperException("Invalid mapper");
    }

    /**
     * Convert a RoleDto to a Role
     * @param source
     * @return Role
     */
    private Role toRole(RoleDto source) {
        Role role = roleService.getRole(source.getName());
        return role;
    }

    /**
     * Convert a Role to a RoleDto
     * @param source
     * @return RoleDto
     *
     */
    private RoleDto toRoleDto(Role source) {
        RoleDto role = new RoleDto(source);
        return role;
    }

}
