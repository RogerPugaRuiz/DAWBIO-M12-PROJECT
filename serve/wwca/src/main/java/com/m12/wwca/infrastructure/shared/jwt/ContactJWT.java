package com.m12.wwca.infrastructure.shared.jwt;

import java.util.UUID;

import com.m12.wwca.infrastructure.shared.Utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class ContactJWT {
    private static String key = "2s_24bFCXg@.`U7e<3w#v\"4yK5+ER0OT|B|C9`Ow)0F|hlTZQHs5:b7}*eIpw$q";

    public static String getJWT(String userId, String contactId) {
        String jwt = getJwtStr(userId, contactId);
        return jwt;
    }

    private static String getJwtStr(String userId, String contactId) {
        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(userId)
                .signWith(SignatureAlgorithm.HS256, key.getBytes())
                .setIssuedAt(Utils.getCurrentDate())
                .setExpiration(Utils.getExpirationDate(0,0,5))
                .claim("contact_id", contactId)
                .compact();
    }

    public static Boolean validateContactId(String jwt, String contactId) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .get("contact_id", String.class)
                .equals(contactId) && validate(jwt);
    }

    public static Boolean validateUserId(String jwt, String userId) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .getSubject()
                .equals(userId) && validate(jwt);
    }

    public static Boolean validate(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .getExpiration() 
                .hashCode() > Utils.getCurrentDate().hashCode();
    }

    public static String getContactId(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .get("contact_id", String.class);
    }

    public static String getUserId(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .getSubject();
    }

    public static String getId(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .getId();
    }
}
