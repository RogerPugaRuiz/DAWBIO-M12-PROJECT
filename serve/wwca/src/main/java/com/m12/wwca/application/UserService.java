package com.m12.wwca.application;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import com.m12.wwca.domain.AppUser;
import com.m12.wwca.domain.Role;
import com.m12.wwca.domain.repo.RoleRepo;
import com.m12.wwca.domain.repo.UserRepo;

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
    
    @Autowired
    private UserRepo userRepo; // UserRepoMysqlAdapter

    @Autowired
    private RoleRepo roleRepo; // RoleRepoMysqlAdapter

    // Logger debug
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private UUID uuid = UUID.randomUUID(); // generate random uuid

    @Transactional
    /**
     * Add a new user
     * @param name
     * @param email
     * @param password
     * @param role
     */
    public void addUser(String name, String password, String email, String role){
        // info add new user
        logger.info("add new user: " + name);
        // create new user
        AppUser user = new AppUser.Builder()
                .id(uuid.toString())
                .username(name)
                .password(password)
                .email(email)
                .role(roleRepo.getRole(role))
                .build();
        
        // try to add user to database and if it fails, throw exception
        
        userRepo.addUser(user);
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
}
