package com.m12.wwca.infrastructure.rest;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.m12.wwca.application.UserService;
import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.infrastructure.dto.UserManageDto;
import com.m12.wwca.infrastructure.shared.Status;
import com.m12.wwca.infrastructure.shared.Utils;
import com.m12.wwca.infrastructure.shared.jwt.UserJWT;

import org.apache.catalina.connector.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/admin")
public class AdminApi {

    @Autowired
    private UserService userService;

    Logger logger = LoggerFactory.getLogger(AdminApi.class);

    /**
     * get all users
     */
    @GetMapping("/users")
    public ResponseEntity<Status> getUsers(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        HttpHeaders headers = new HttpHeaders();
        headers.set("WWW-Authenticate", "Bearer");
        try {
            if (UserJWT.validateAuthority(jwt, "admin")) {
                List<AppUser> users = userService.getUsers();

                Status status = new Status(false, "get users success");
                Map<Object, Object> data = new HashMap<>();
                data.put("users", users);
                status.setData(data);
                return ResponseEntity.status(HttpStatus.OK).body(status);
            } else {
                Status status = new Status(false, "unauthorized");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .headers(headers)
                        .body(status);

            }
        } catch (MalformedJwtException mje) {
            logger.error("Error: " + mje.getMessage());
            Status status = new Status(false, "malformed jwt");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .headers(headers)
                    .body(status);
        } catch (SignatureException se) {

            logger.error("Error: " + se.getMessage());
            Status status = new Status(false, "invalid signature");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .headers(headers)
                    .body(status);
        } catch (Exception e) {
            logger.error("Error: " + e.getMessage());
            Status status = new Status(false, "error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).header("Authorization", "fail")
                    .headers(headers)
                    .body(status);
        }

        // logger.info("header: "+ JWToken.decodeHeader(jwt));
        // logger.info("payload: "+ JWToken.decodePayload(jwt));
        // logger.info("signature: "+ JWToken.decodeSignature(jwt));
        // logger.info("validate: " + JWToken.validateAuthority(jwt , "user") );

    }


    @GetMapping("/jwt/verify-admin")
    public ResponseEntity verifyJwtAdmin(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        try {
            UserJWT.validate(jwt);
            AppUser user = userService.getUser(UserJWT.getUserId(jwt));
            if (user.getRole().getName().equals("admin")) {
                return ResponseEntity.ok().body(new Status(true, "Token valid"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, "Invalid token"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, e.getMessage()));
        }
    }

    @GetMapping("/user")
    public ResponseEntity getUser(@RequestParam("id") String id, HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        try {
            if (UserJWT.validateAuthority(jwt, "admin")) {
                AppUser user = userService.getUser(id);
                if (user != null) {
                    Status status = new Status(false, "get user success");
                    Map<Object, Object> data = new HashMap<>();
                    data.put("user", user);
                    status.setData(data);
                    return ResponseEntity.ok().body(status);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Status(false, "user not found"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, "unauthorized"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Status(false, e.getMessage()));
        }
    }

    @PostMapping("/update-user")
    public ResponseEntity updateUser(@RequestBody AppUser user, HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        try {
            if (UserJWT.validateAuthority(jwt, "admin")) {
                userService.updateUser(user);
                return ResponseEntity.ok().body(new Status(true, "update user success"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, "unauthorized"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(new Status(false, e.getMessage()));
        }
    }

    @PostMapping("/delete-user")
    public ResponseEntity deleteUser(@RequestBody AppUser user, HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        try {
            if (UserJWT.validateAuthority(jwt, "admin")) {
                userService.deleteUser(user);
                return ResponseEntity.ok().body(new Status(true, "delete user success"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Status(false, "unauthorized"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(new Status(false, e.getMessage()));
        }
    }
}
