package com.m12.wwca.infrastructure.shared;

import java.util.ArrayList;
import java.util.Map;

/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 *
 */
public class Status{

    // is the status of the operation
    private boolean isOk;
    private Map<Object,Object> data;
    private int length = 0;

    // message of the operation, if any error occurred or if the operation was successful
    private String message;

    /**
     * Constructor with parameters
     * @param isOk
     * @param message
     */
    public Status(boolean isOk, String message) {
        this.isOk = isOk;
        this.message = message;
    }

    /**
     * Getter for the isOk
     * @return isOk
     */
    public boolean isOk() {
        return isOk;
    }

    /**
     * Setter for the isOk
     * @param isOk
     */
    public String getMessage() {
        return message;
    }

    public void setOk(boolean isOk) {
        this.isOk = isOk;
    }

    public Map<Object,Object> getData() {
        return data;
    }

    public void setData(Map<Object,Object> data) {
        this.data = data;
        this.length = data.size();
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getLength() {
        return length;
    }

    
}
