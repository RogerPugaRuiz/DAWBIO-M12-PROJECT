package com.m12.wwca.infrastructure.shared;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.regex.Pattern;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import com.google.common.hash.Hashing;
import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.ChatContact;
import com.m12.wwca.infrastructure.dto.ContactInfo;
import com.m12.wwca.infrastructure.dto.UserManageDto;

public class Utils {
    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    /**
     * Check if id is an email
     * 
     * @param id
     * @return true if id is an email
     */
    public static boolean isAnEmail(String id) {

        // pattern for email
        Pattern pattern = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        // check if id is an email
        return pattern.matcher(id).matches();
    }

    /**
     * Convert a list of users to a list of userDto
     * 
     * @param users
     * @return List<UserDto>
     * @throws InvalidMapperException
     */
    public static List<UserManageDto> usersToDto(List<AppUser> users) {
        List<UserManageDto> usersDto = new ArrayList<>();
        for (AppUser user : users) {
            // UserDto userDto = (UserDto)
            // MapperFactory.getMapper(UserMapper.class).map(UserDto.class, user);
            UserManageDto userDto = appUserToUserDto(user);
            usersDto.add(userDto);
        }
        return usersDto;
    }

    public static UserManageDto appUserToUserDto(AppUser user) {
        UserManageDto userDto = new UserManageDto.Builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole().getName())
                .subscribed(user.getSubscribed())
                .build();
        return userDto;
    }

    public static String readFile(File file) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(file));
        StringBuilder stringBuilder = new StringBuilder();
        String line = null;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line + "\n");
        }
        reader.close();
        return stringBuilder.toString();
    }

    /**
     * Generate AES key
     * 
     * @param password
     * @param salt
     * @return
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     */
    public static SecretKey getKeyFromPassword(String password, String salt)
            throws NoSuchAlgorithmException, InvalidKeySpecException {

        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt.getBytes(), 65536, 256);
        SecretKey secret = new SecretKeySpec(factory.generateSecret(spec)
                .getEncoded(), "AES");
        return secret;
    }

    /**
     * Random string generator
     * 
     */
    public static String generateRandomPassword(int len) {
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk"
                + "lmnopqrstuvwxyz!@#$%&";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }

    /**
     * get the current date
     * 
     */
    public static Date getCurrentDate() {
        return new Date(System.currentTimeMillis());
    }

    /**
     * get the expiration date
     */

    public static Date getExpirationDate(int days, int hours, int minutes) {
        return new Date(System.currentTimeMillis() + (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000));
    }

    /**
     * Transform list of chat contacts to a chat info
     * @param contacts
     */
    public static List<ContactInfo> chatContactsToContactInfo(ArrayList<ChatContact> contacts) {
        List<ContactInfo> contactInfo = new ArrayList<>();
        for (ChatContact chatContact : contacts) {
            ContactInfo contact = new ContactInfo(chatContact.getContact().getUsername());
            contactInfo.add(contact);
        }
        return contactInfo;
    }

}
