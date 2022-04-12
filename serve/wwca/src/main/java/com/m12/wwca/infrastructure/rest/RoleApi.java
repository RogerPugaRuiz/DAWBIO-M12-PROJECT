package com.m12.wwca.infrastructure.rest;

import java.util.ArrayList;
import java.util.List;

import com.m12.wwca.application.RoleService;
import com.m12.wwca.domain.Role;
import com.m12.wwca.infrastructure.mapper.RoleMapper;
import com.m12.wwca.infrastructure.mapper.dto.RoleDto;
import com.m12.wwca.infrastructure.mapper.exception.InvalidMapperException;
import com.m12.wwca.infrastructure.shared.MapperFactory;
import com.m12.wwca.infrastructure.shared.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 *
 */
public class RoleApi {
    @Autowired
    // inject the RoleService by Spring
    private RoleService roleService;

    @GetMapping("/api/add-role/{name}")
    /**
     * Add a new role to the database with the name provided in the path parameter
     * @param name name of the role
     * @return ResponseEntity
     *
     */
    public ResponseEntity addRole(@PathVariable(value = "name", required = true) String name) {
        Role role = new Role(name);
        try{
            roleService.addRole(role);
        }catch(Exception e){
            return ResponseEntity.ok(new Status(false, e.getMessage()));
        }
        return ResponseEntity.ok(new Status(true, name + " : Role added"));
    }

    @GetMapping("/api/get-roles/{name}")
    /**
     * Get all the roles with the name provided in the path parameter
     * @param name
     * @return ResponseEntity
     */
    public ResponseEntity getRole(@PathVariable(value = "name", required = true) String name) {

        try{
            Role role = roleService.getRole(name);
            RoleDto roleDto = (RoleDto) MapperFactory.getMapper(RoleMapper.class).map(RoleDto.class, role);
            return ResponseEntity.ok(roleDto);
        } catch(Exception e){
            return ResponseEntity.ok(new Status(false , e.getMessage()));
        }
    }

    @GetMapping("/api/get-roles")
    /**
     * Get all the roles
     * @return ResponseEntity
     */
    public ResponseEntity getRoles() {
        try{
            List<Role> roles = roleService.getRoles();
            List<RoleDto> roleDtos = new ArrayList<>();
            for (Role role : roles) {
                RoleDto roleDto = (RoleDto) MapperFactory.getMapper(RoleMapper.class).map(RoleDto.class, role);
                roleDtos.add(roleDto);
            }
            return ResponseEntity.ok(roleDtos);
        } catch(Exception e){
            return ResponseEntity.ok(new Status(false , e.getMessage()));
        }
    }

    @GetMapping("/api/delete-role/{name}")
    /**
     * Delete a role with the name provided in the path parameter
     * @param name
     * @return ResponseEntity
     */
    public ResponseEntity deleteRole(@PathVariable(value = "name", required = true) String name) {
        try{
            roleService.deleteRole(name);
            return ResponseEntity.ok(new Status(true, "Role deleted"));
        } catch(Exception e){
            return ResponseEntity.ok(new Status(false, e.getMessage()));
        }
    }

    @GetMapping("/api/update-role/{name}")
    /**
     * Update a role with the name provided in the path parameter
     * @param name
     * @param newName
     * @return ResponseEntity
     */
    public ResponseEntity updateRole(@PathVariable(value = "name", required = true) String name, @RequestParam(value = "to", required = true) String newName) {
        try{
            roleService.updateRole(name, newName);
            return ResponseEntity.ok(new Status(true, "Role updated"));
        } catch(Exception e){
            return ResponseEntity.ok(new Status(false, e.getMessage()));
        }
    }
}
