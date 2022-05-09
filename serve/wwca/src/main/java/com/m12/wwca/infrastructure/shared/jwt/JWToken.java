package com.m12.wwca.infrastructure.shared.jwt;

import java.util.UUID;

import javax.crypto.spec.SecretKeySpec;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.infrastructure.shared.Utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.DefaultJwtSignatureValidator;
import io.jsonwebtoken.io.Decoder;

public class JWToken {
    private static String key = "Everything But The Kitchen Sink";

    public static String getJWT(AppUser user) {

        String jws = getJwtStr(user);
        return jws;
    }

    private static String getJwtStr(AppUser user) {
        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(user.getUsername())
                .signWith(SignatureAlgorithm.HS256, key.getBytes())
                .setIssuedAt(Utils.getCurrentDate())
                .setExpiration(Utils.getExpirationDate(0,24,0))
                .claim("authorities", user.getRole().toString())
                .claim("email", user.getEmail())
                .claim("user_id", user.getId())
                .compact();
    }

    public static Boolean validateAuthority(String jwt, String authority) {

        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .get("authorities", String.class)
                .equals(authority) && validate(jwt);
    }

    public static Boolean validateSubject(String jwt, String subject) {

        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .getSubject()
                .equals(subject) && validate(jwt);
    }

    public static Boolean validate(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .getExpiration()
                .hashCode() > Utils.getCurrentDate().hashCode();
    }

    /**
     * Decode header from JWT
     * 
     * @param jwt
     * @return decoded header
     *
     */
    public static String decodeHeader(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getHeader()
                .toString();
    }

    /**
     * Decode payload from JWT
     * 
     * @param jwt
     * @return decoded payload
     */
    public static String decodePayload(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .toString();
    }

    /**
     * Decode signature from JWT
     * 
     * @param jwt
     * @return decoded signature
     */
    public static String decodeSignature(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getSignature();
    }

    /**
     * get JWT subject
     * @return string
     */
    public static String getSubject(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .getSubject();
    }

    /**
     * get JWT email
     * @return email
     */
    public static String getEmail(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .get("email", String.class);
    }

    /**
     * get JWT user_id
     * @return user_id
     */
    public static String getUserId(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .get("user_id", String.class);
    }
}
