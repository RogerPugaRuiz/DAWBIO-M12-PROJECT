package com.m12.wwca.infrastructure.dto;

import com.m12.wwca.infrastructure.shared.sortedArray.CompareSizes;

public class MessageDto implements CompareSizes{
    private String message;
    private String sendBy;
    private String sendTo;
    private Long timestamp;

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

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean isGreater(CompareSizes other) {
        return this.timestamp > Long.parseLong(other.getValue().toString());
    }

    @Override
    public Object getValue() {
        return this.timestamp;
    }
}
