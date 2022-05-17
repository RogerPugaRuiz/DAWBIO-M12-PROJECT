package com.m12.wwca.infrastructure.shared.jwt;

import java.util.UUID;

import com.m12.wwca.infrastructure.shared.Utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class ConfirmedContactJWT {
    private static String key = "A?f3pi(6}v2O`JU>8dj{H5WtEc~)owO=T@fYW(RKMfD\"-u0#egCuh$z\"F#jISmG";

    public static String getJWT(String contactJwtId, boolean confirmed) {
        String jwt = getJwtStr(contactJwtId, confirmed);
        return jwt;
    }

    private static String getJwtStr(String contactJwtId, boolean confirmed) {
        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(contactJwtId)
                .signWith(SignatureAlgorithm.HS256, key.getBytes())
                .setIssuedAt(Utils.getCurrentDate())
                .setExpiration(Utils.getExpirationDate(0,0,5))
                .claim("confirmed", confirmed)
                .compact();
    }

    public static Boolean validateConfirmed(String jwt, boolean confirmed) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .get("confirmed", Boolean.class)
                .equals(confirmed) && validate(jwt);
    }

    public static Boolean validate(String jwt) {
        return Jwts.parser()
                .setSigningKey(key.getBytes())
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .getExpiration() 
                .hashCode() > Utils.getCurrentDate().getTime();
    }
}
