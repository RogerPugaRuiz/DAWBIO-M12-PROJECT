package com.m12.wwca.infrastructure.shared;

import java.util.regex.Pattern;

public class Utils {
        /**
     * Check if id is an email
     * @param id
     * @return true if id is an email
     */
    public static boolean isAnEmail(String id) {

        // pattern for email
        Pattern pattern = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        // check if id is an email
        return pattern.matcher(id).matches();
    }

    
}
