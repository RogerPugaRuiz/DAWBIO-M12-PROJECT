package com.m12.wwca.infrastructure.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

// import project classes
import com.m12.wwca.application.UserService;
import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.ChatContact;
import com.m12.wwca.domain.entity.Message;
import com.m12.wwca.domain.repo.RoleRepo;
import com.m12.wwca.infrastructure.dto.SignUpDto;
import com.m12.wwca.infrastructure.dto.ContactConfirm;
import com.m12.wwca.infrastructure.dto.LoginUserDto;
import com.m12.wwca.infrastructure.dto.MyAccount;
import com.m12.wwca.infrastructure.dto.ProfileDto;
import com.m12.wwca.infrastructure.shared.Status;
import com.m12.wwca.infrastructure.shared.Utils;
import com.m12.wwca.infrastructure.shared.jwt.ContactJWT;
import com.m12.wwca.infrastructure.shared.jwt.UserJWT;

import org.apache.catalina.connector.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// import spring classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public class UserApi {
    @Autowired
    // inject the UserService by Spring
    private UserService userService;

    @Autowired
    private RoleRepo roleRepo;

    private Logger logger = LoggerFactory.getLogger(UserApi.class);

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginUserDto loginUserDto) {
        // info login user
        // get user
        String jwt = userService.login(loginUserDto.getId(), loginUserDto.getPassword());
        HttpHeaders authorization = new HttpHeaders();
        authorization.set("Authorization", jwt);

        if (jwt == null) {
            Status response = new Status(false, "User or password incorrect");
            return ResponseEntity.ok().body(response);

        } else {
            AppUser user = userService.getUser(UserJWT.getUserId(jwt));
            ProfileDto profile = new ProfileDto(user);

            Status response = new Status(true, "User found");
            Map<Object, Object> data = new HashMap<>();
            data.put("jwt", jwt);
            data.put("profile", profile);
            response.setData(data);
            return ResponseEntity.ok().headers(authorization).body(response);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Status> signup(@RequestBody SignUpDto addUserDto) {
        // info add new user
        if (addUserDto.getConfirmPassword().equals(addUserDto.getPassword())) {
            try {
                AppUser user = new AppUser.Builder()
                        .username(addUserDto.getUsername())
                        .password(addUserDto.getPassword())
                        .email(addUserDto.getEmail())
                        .role(roleRepo.getRole("user"))
                        .build();

                if (userService.getUserByEmail(addUserDto.getEmail()) == null
                        && userService.getUserByUsername(addUserDto.getUsername()) == null) {
                    userService.addUser(user);
                    Status response = new Status(true, "Signup Successful");
                    return ResponseEntity.ok(response);
                } else {
                    Status response = new Status(false, "User already exists");
                    return ResponseEntity.ok(response);
                }
            } catch (Exception e) {
                Status response = new Status(false, e.getMessage());
                return ResponseEntity.ok(response);
            }
        } else {
            Status response = new Status(false, "Confirm Password does not match");
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/user")
    public ResponseEntity userExists(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email) {
        Status status = new Status(false, "error");

        if (username != null && email != null) {
            if (userService.getUserByUsername(username) != null && userService.getUserByEmail(email) != null) {
                status.setOk(true);
                status.setMessage("Username and email already registered as a user");
                return ResponseEntity.ok(status);
            }
        } else if (username != null) {
            if (userService.getUserByUsername(username) != null) {
                status.setOk(true);
                status.setMessage("Username is already registered as a user");
                return ResponseEntity.ok(status);
            }
        } else if (email != null) {
            if (userService.getUserByEmail(email) != null) {
                status.setOk(true);
                status.setMessage("Email is already registered as a user");
                return ResponseEntity.ok(status);
            }
        }

        status.setOk(false);
        status.setMessage("Username and email are not registered as a user");
        return ResponseEntity.ok(status);
    }

    @GetMapping("/myaccount")
    public ResponseEntity getMyAccount(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");

        // verify if jwt is valid
        if (UserJWT.validate(jwt)) {
            AppUser user = userService.getUser(UserJWT.getUserId(jwt));
            MyAccount myAccount = new MyAccount.Builder().from(user).build();

            Status status = new Status(true, "User found");
            Map<Object, Object> data = new HashMap<>();
            data.put("myAccount", myAccount);
            status.setData(data);
            return ResponseEntity.ok().body(status);
        } else {
            Status response = new Status(false, "Invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/myaccount")
    public ResponseEntity updateMyAccount(@RequestBody MyAccount myAccount, HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");

        if (UserJWT.validate(jwt)) {
            AppUser user = userService.getUser(myAccount.getId());

            if (user != null) {
                user.setEmail(myAccount.getEmail());
                user.setDescription(myAccount.getDescription());
                user.setUsername(myAccount.getUsername());
                user.setFirstname(myAccount.getFirstname());
                user.setLastname(myAccount.getLastname());

                userService.updateUser(user);
            }

            return ResponseEntity.ok().body(new Status(true, "User updated"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, "Invalid token"));
        }

    }

    @GetMapping("/jwt/verify")
    public ResponseEntity verifyJwt(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        try {
            UserJWT.validate(jwt);
            return ResponseEntity.ok().body(new Status(true, "Token valid"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, e.getMessage()));
        }
    }

    @PostMapping("/confirm-contact")
    public ResponseEntity confirmContact(@RequestBody ContactConfirm contactConfirm, HttpServletRequest request) {
 
        String jwt = request.getHeader("Authorization");
        try {
            if (UserJWT.validate(jwt)) {
                logger.info("jwt " + UserJWT.getUserId(jwt));
                logger.info("contactJwt " + ContactJWT.getContactId(contactConfirm.getContactJwt()));
                if (ContactJWT.validateContactId(contactConfirm.getContactJwt(), UserJWT.getUserId(jwt))) {
                    if (contactConfirm.getConfirm()) {
                        AppUser user = userService.getUser(ContactJWT.getUserId(contactConfirm.getContactJwt()));
                        AppUser contact = userService.getUser(ContactJWT.getContactId(contactConfirm.getContactJwt()));
                        userService.saveChatContact(new ChatContact(user, contact));
                        userService.saveChatContact(new ChatContact(contact, user));
                        return ResponseEntity.ok().body(new Status(true, "Contact confirmed"));
                    } else {
                        return ResponseEntity.ok().body(new Status(true, "Contact rejected"));
                    }
                }
                else {
                    return ResponseEntity.ok().body(new Status(false, "Invalid token"));
                }

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, "Invalid token"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, e.getMessage()));
        }
    }

    @GetMapping("/send-contact-request")
    public ResponseEntity sendContactRequest(@RequestParam String user, @RequestParam String contact,
            HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        try {
            if (UserJWT.validate(jwt)) {
                AppUser userObj = userService.getUserByUsername(user);

                AppUser contactObj = userService.getUserByUsername(contact);
                if (UserJWT.validateSubject(jwt, user)) {
                    String contactJwt = ContactJWT.getJWT(userObj.getId(), contactObj.getId());
                    Map<Object, Object> data = new HashMap<>();
                    data.put("contactJwt", contactJwt);
                    Status status = new Status(true, "Contact request sent");
                    status.setData(data);
                    return ResponseEntity.ok().body(data);
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, "Invalid token"));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, "Invalid token"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, e.getMessage()));
        }
    }

    @GetMapping("/get-contacts")
    public ResponseEntity getContacts(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        try {
            if (UserJWT.validate(jwt)) {
                AppUser user = userService.getUser(UserJWT.getUserId(jwt));
                ArrayList<ChatContact> contacts = (ArrayList<ChatContact>) userService.getUserContactChat(user);
                Map<Object, Object> data = new HashMap<>();
                data.put("contacts", Utils.chatContactsToContactInfo(contacts));
                Status status = new Status(true, "Contacts found");
                return ResponseEntity.ok().body(data);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, "Invalid token"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, e.getMessage()));
        }
    }
}
