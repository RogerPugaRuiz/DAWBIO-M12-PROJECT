package com.m12.wwca.infrastructure.persistence;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.Role;
import com.m12.wwca.domain.repo.UserRepo;
import com.m12.wwca.infrastructure.shared.Cryptography;
import com.m12.wwca.infrastructure.shared.Utils;

import org.springframework.stereotype.Repository;

@Repository
/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 * 
 */
public class UserRepoMysqlAdapter implements UserRepo {

    @PersistenceContext
    // EntityManager is a container-managed entity manager
    private EntityManager entityManager;

    @Override
    /**
     * Add a new user
     * 
     * @param user
     */
    public void addUser(AppUser user) {
        String encriptPassword;

        encriptPassword = Cryptography.encrypt(user.getPassword());

        if (encriptPassword != null) {
            user.setPassword(encriptPassword);
            entityManager.persist(user);
        }
    }

    @Override
    /**
     * Get a user by filter
     * 
     * @param username
     * @param email
     * @param role
     * @return List<AppUser>
     */
    public List<AppUser> getUsersFilter(String username, String email, Role role) {
        List<AppUser> users = entityManager
                .createQuery(
                        "SELECT r FROM users r WHERE username LIKE :username and email LIKE :email and role = :role",
                        AppUser.class)
                .setParameter("username", username)
                .setParameter("email", email)
                .setParameter("role", role)
                .getResultList();

        return users;
    }

    @Override
    /**
     * Get a users
     * 
     * @return List<AppUser>
     */
    public List<AppUser> getUsers() {
        List<AppUser> users = entityManager.createQuery("SELECT r FROM users r", AppUser.class).getResultList();

        return users;

    }

    @Override
    /**
     * Get a user by email
     * 
     * @param email
     * @return AppUser
     */
    public AppUser getUserByEmail(String email) {
        try {
            return entityManager.createQuery("SELECT r FROM users r WHERE email = :email", AppUser.class)
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    /**
     * login
     * 
     * @param id
     * @param password
     * @return if user is logged in
     */
    public boolean login(String id, String password) {
        password = Cryptography.sha256(password);
        // if id is email
        if (Utils.isAnEmail(id)) {
            // get user by email
            AppUser user = getUserByEmail(id);
            // if password is correct and user is not null
            return checkPassword(user, password);
        }
        // if id is username
        else {
            // get user by username
            AppUser user = getUserByUsername(id);
            // if password is correct and user is not null
            return checkPassword(user, password);
        }
        // if password is incorrect or user not found
    }

    public boolean checkPassword(AppUser user, String password) {
        if (user != null) {
            // check if password is correct
            String passwordDecrypt = Cryptography.decrypt(user.getPassword());
            if (passwordDecrypt.equals(password)) {
                user.setLastLogin(LocalDateTime.now());
                return true;
            }
        }
        return false;
    }

    @Override
    /**
     * Get a user by username
     * 
     * @param username
     * @return AppUser
     */
    public AppUser getUserByUsername(String username) {
        // sql query to get a user by username
        try {
            return entityManager.createQuery("SELECT r FROM users r WHERE username = :username", AppUser.class)
                    .setParameter("username", username)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    /**
     * Delete user
     * 
     * @param user
     *
     */
    public void deleteUser(AppUser user) {
        if (user != null) {
            entityManager.createQuery("DELETE FROM users r WHERE id = :id")
                    .setParameter("id", user.getId())
                    .executeUpdate();
        }
    }

    @Override
    
    public AppUser getUser(String id) {
        // sql query to get a user by id
        try {
            return entityManager.createQuery("SELECT r FROM users r WHERE id = :id", AppUser.class)
                    .setParameter("id", id)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    /**
     * Update user
     * @param user
     */
    public void updateUser(AppUser user) {
        if (user != null) {
            entityManager.merge(user);
        }
    }

}
