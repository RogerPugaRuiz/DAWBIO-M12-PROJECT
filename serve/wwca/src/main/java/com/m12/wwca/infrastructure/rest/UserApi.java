package com.m12.wwca.infrastructure.rest;

// import java util
import java.util.ArrayList;
import java.util.List;

// import project classes
import com.m12.wwca.application.UserService;
import com.m12.wwca.domain.AppUser;
import com.m12.wwca.infrastructure.dto.AddUserDto;
import com.m12.wwca.infrastructure.dto.LoginUserDto;
import com.m12.wwca.infrastructure.dto.UserDto;
import com.m12.wwca.infrastructure.shared.Status;
import com.m12.wwca.infrastructure.shared.Utils;

// import spring classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public class UserApi {
    @Autowired
    // inject the UserService by Spring
    private UserService userService;

    @GetMapping("")
    /**
     * Get all the users
     * 
     * @return ResponseEntity
     */
    public ResponseEntity getUsers() {
        try {
            List<AppUser> users = userService.getUsers();
            List<UserDto> usersDto = Utils.usersToDto(users);
    
            return ResponseEntity.ok(usersDto);
    
        } catch (Exception e) {
            return ResponseEntity.ok(new Status(false, e.getMessage()));
        }
    }
    
    @PostMapping("/add")
    /**
     * Add a new user to the database with the name provided in the path parameter
     * 
     * @param addUserDto
     * @return ResponseEntity
     *
     */
    public ResponseEntity addUser(@RequestBody AddUserDto addUserDto) {
        try {
            userService.addUser(addUserDto);
            return ResponseEntity.ok(new Status(true, "User added"));
        } catch (Exception e) {
            return ResponseEntity.ok(new Status(false, e.getMessage()));
        }
    }

    @GetMapping("/search")
    /**
     * Get all the users with the username, email and role provided in the path
     * parameter
     * 
     * @param username
     * @param email
     * @param role
     * @return ResponseEntity
     */
    public ResponseEntity getUsersFilter(
            @RequestParam(value = "username", required = false, defaultValue = "") String username,
            @RequestParam(value = "email", required = false, defaultValue = "") String email,
            @RequestParam(value = "role", required = true) String role) {
        try {
            List<AppUser> users = userService.getUsersFilter(username, email, role);
            List<UserDto> usersDto = Utils.usersToDto(users);
            return ResponseEntity.ok(usersDto);
        } catch (Exception e) {
            return ResponseEntity.ok(new Status(false, e.getMessage()));
        }
    }

    @GetMapping("/email/{email}")
    /**
     * Get all the users with the email provided in the path parameter
     * 
     * @param email
     * @return ResponseEntity
     */
    public ResponseEntity getUsersByEmail(@PathVariable(value = "email", required = true) String email) {
        try {
            AppUser user = userService.getUserByEmail(email);
            UserDto userDto = Utils.appUserToUserDto(user);
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.ok(new Status(false, e.getMessage()));
        }
    }


    @PostMapping("/login")
    /**
     * Check if the user can login with the username or email and password provided
     * in the path parameter
     * 
     * @param user
     * @return ResponseEntity
     */
    
    public @ResponseBody ResponseEntity login(
            @RequestBody LoginUserDto user) {
        if (userService.login(user.getId(), user.getPassword())) {
            return ResponseEntity.ok(new Status(true, "User logged in"));
        } else {
            return ResponseEntity.ok(new Status(false, "User not logged in"));
        }
    }

    @GetMapping("/remove/{id}")
    /**
     * Remove the user with the id provided in the path parameter 
     * 
     * @param id is an email or username
     * @return ResponseEntity
     */
    public @ResponseBody ResponseEntity removeUser(@PathVariable(value = "id", required = true) String id) {
        try {
            AppUser user;
            if (Utils.isAnEmail(id)) {
                user = userService.getUserByEmail(id);
            } else {
                user = userService.getUserByUsername(id);
            }
            userService.deleteUser(user);
            return ResponseEntity.ok(new Status(true, "User removed"));
        } catch (Exception e) {
            return ResponseEntity.ok(new Status(false, e.getMessage()));
        }
    }
}
