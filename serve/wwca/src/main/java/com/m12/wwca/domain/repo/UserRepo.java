package com.m12.wwca.domain.repo;

import java.util.List;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.Role;

public interface UserRepo {
    public void addUser(AppUser user);
    public List<AppUser> getUsersFilter(String username, String email, Role role); // Get all users filtered by username, email and role
    public List<AppUser> getUsers(); // Get all users
    public AppUser getUserByEmail(String email); // Get a user by email
    public AppUser getUserByUsername (String username); // Get a user by username
    public AppUser getUser(String id); // Get a user by id
    public boolean login(String id, String password); // Check if user is logged in
    public void deleteUser(AppUser user); // Delete user
    public void updateUser(AppUser user); // Update user
    public void deleteUsers(List<String> ids); // Delete users

}
