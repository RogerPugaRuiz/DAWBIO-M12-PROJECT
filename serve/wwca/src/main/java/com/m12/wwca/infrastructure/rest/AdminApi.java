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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
        List<UserManageDto> users_dto = new ArrayList<>();
        String jwt = request.getHeader("Authorization");
        HttpHeaders headers = new HttpHeaders();
        headers.set("WWW-Authenticate", "Bearer");
        try {
            if (UserJWT.validateAuthority(jwt, "admin")) {
                List<AppUser> users = userService.getUsers();
                for (AppUser user : users) {
                    if (user.getRole() != null){
                        UserManageDto user_dto = new UserManageDto.Builder()
                                .username(user.getUsername())
                                .email(user.getEmail())
                                .password(user.getPassword())
                                .role(user.getRole().toString())
                                .subscribed(user.getSubscribed())
                                .lastLogin(user.getLastLogin())
                                .build();
                        users_dto.add(user_dto);
                    } else{
                        logger.error("User with id: " + user.getId() + " has no role");
                    }
                }

                Status status = new Status(false, "get users success");
                Map<Object, Object> data = new HashMap<>();
                data.put("users", users_dto);
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
}
