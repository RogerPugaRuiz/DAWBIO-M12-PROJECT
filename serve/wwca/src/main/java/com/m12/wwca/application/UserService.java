package com.m12.wwca.application;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import com.m12.wwca.domain.AppUser;
import com.m12.wwca.domain.Role;
import com.m12.wwca.domain.repo.RoleRepo;
import com.m12.wwca.domain.repo.UserRepo;
import com.m12.wwca.infrastructure.dto.AddUserDto;
import com.m12.wwca.infrastructure.dto.UserDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public class UserService {

    private RoleRepo roleRepo; // RoleRepoMysqlAdapter
    private UserRepo userRepo; // UserRepoMysqlAdapter
    private final String DEFAULT_ROLE = "USER";

    @Autowired
    public UserService(RoleRepo roleRepo, UserRepo userRepo) {
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
    }


    // Logger debug
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);


    @Transactional
    /**
     * Add a new user
     * @param name
     * @param email
     * @param password
     * @param role
     */
    public void addUser(AddUserDto addUserDto){
        // info add new user
        logger.info("add new user: " + addUserDto.getUsername());
        // create new user
        AppUser user;
            // user = (AppUser) MapperFactory.getMapper(UserMapper.class).map(AppUser.class, addUserDto);
        user = new AppUser.Builder()
                .username(addUserDto.getUsername())
                .password(addUserDto.getPassword())
                .email(addUserDto.getEmail())
                .role(roleRepo.getRole(DEFAULT_ROLE))
                .build();
            userRepo.addUser(user);

        
        // try to add user to database and if it fails, throw exception
        
        
    }

    @Transactional
    /**
     * Get a user by email
     * @param email
     * @return AppUser
     */
    public AppUser getUserByEmail(String email){
        // info get user by email
        logger.info("get user by email: " + email);
        return userRepo.getUserByEmail(email);
    }

    @Transactional
    /**
     * Get user with filter
     * @param username
     * @param email
     * @param role
     * @return List<AppUser>
     */
    public List<AppUser> getUsersFilter(String username, String email, String role){
        Role roleId = roleRepo.getRole(role);

        // info get users with filter
        logger.info("get users with filter: " + username + ", " + email + ", " + role);
        return userRepo.getUsersFilter("%"+username+"%", "%"+email+"%", roleId);
    }

    @Transactional
    /**
     * Get all users
     * @return List<AppUser>
     */
    public List<AppUser> getUsers(){
        // info get all users
        logger.info("get all users");
        return userRepo.getUsers();
    }

    @Transactional
    /**
     * Method to login with email or username
     * @param id
     * @param password
     * @return true if login is successful
     */
    public boolean login(String id, String password){
        // info login
        logger.info("login: " + id + ", " + password);
        return userRepo.login(id, password);
    }

    @Transactional
    /**
     * Method to delete user
     * @param user
     * @return true if user is deleted
     *
     */
    public void deleteUser(AppUser user){
        // info delete user
        logger.info("delete user: " + user.getUsername());
        userRepo.deleteUser(user);
    }

    @Transactional
    /**
     * Method to get user by username
     * @param username
     * @return AppUser
     *
     */
    public AppUser getUserByUsername(String username){
        // info get user by username
        logger.info("get user by username: " + username);
        return userRepo.getUserByUsername(username);
    }
}
