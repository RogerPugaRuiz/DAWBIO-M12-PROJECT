package com.m12.wwca.infrastructure.shared;

import java.nio.charset.StandardCharsets;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import com.google.common.hash.Hashing;

/**
 * @author Roger Puga Ruiz
 * @version 1.0
 */
public class Cryptography {

    private static final String SECRET_KEY = "A Day Late and a Dollar Short";
    private static final String SALT = "PuDLnXVuZewjQCCjs5WgzA6tFzsAB4M2ngCmQ9rseLAUZNP3JnUTzCWQMdgd8TQ6Lh3t4jJ8FVDgz5aTgUqFnbnZfuPYXgUAaND4HcMdJgm9bmD4RSmQUysLCRAbXkBY";

    /**
     * I use the code from
     * https://examples.javacodegeeks.com/core-java/io/fileoutputstream/how-to-write-an-object-to-file-in-java/
     * 
     * @param password
     * @return string with the password encrypted
     */
    public static String encrypt(String strToEncrypt) {
        try {
            strToEncrypt = sha256(strToEncrypt);
            byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            IvParameterSpec ivspec = new IvParameterSpec(iv);

            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(SECRET_KEY.toCharArray(), SALT.getBytes(), 65536, 256);
            SecretKey tmp = factory.generateSecret(spec);
            SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivspec);
            return Base64.getEncoder()
                    .encodeToString(cipher.doFinal(strToEncrypt.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            System.out.println("Error while encrypting: " + e.toString());
        }
        return null;
    }

    /**
     * I use the code from
     * https://examples.javacodegeeks.com/core-java/io/fileoutputstream/how-to-write-an-object-to-file-in-java/
     * 
     * @param strToDecrypt
     * @return string decrypted
     */
    public static String decrypt(String strToDecrypt) {
        try {
            byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            IvParameterSpec ivspec = new IvParameterSpec(iv);

            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(SECRET_KEY.toCharArray(), SALT.getBytes(), 65536, 256);
            SecretKey tmp = factory.generateSecret(spec);
            SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, ivspec);
            return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
        } catch (Exception e) {
            System.out.println("Error while decrypting: " + e.toString());
        }
        return null;
    }

    /**
     * code to generate a hash from a string
     * 
     * @param base
     * @return string hash
     */
    public static String sha256(String base) {
        String sha256hex = Hashing.sha256()
                .hashString(base, StandardCharsets.UTF_8)
                .toString();
        return sha256hex;
    }
}
