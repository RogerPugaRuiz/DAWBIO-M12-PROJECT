package com.m12.wwca.domain.repo;

import java.util.List;

import com.m12.wwca.domain.AppUser;
import com.m12.wwca.domain.Role;

public interface UserRepo {
    public void addUser(AppUser user);
    public List<AppUser> getUsersFilter(String username, String email, Role role); // Get all users filtered by username, email and role
    public List<AppUser> getUsers(); // Get all users
    public AppUser getUserByEmail(String email); // Get a user by email
    public AppUser getUserByUsername (String username); // Get a user by username
    public boolean login(String id, String password); // Check if user is logged in
}
