package com.m12.wwca.infrastructure.dto;

public class MessageDto {
    private String message;
    private String sendBy;
    private String sendTo;

    /**
     * Default constructor
     */
    public MessageDto() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSendBy() {
        return sendBy;
    }

    public void setSendBy(String sendBy) {
        this.sendBy = sendBy;
    }

    public String getSendTo() {
        return sendTo;
    }

    public void setSendTo(String sendTo) {
        this.sendTo = sendTo;
    }

    
}
