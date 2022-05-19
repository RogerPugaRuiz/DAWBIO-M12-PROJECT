package com.m12.wwca.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

/**
 * Message entity
 * @author Roger Puga Ruiz
 * @version 1.0
 */
@Entity(name = "messages")
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String message;
    @OneToOne
    private AppUser sendBy;
    @OneToOne
    private AppUser sendTo;
    private Long timestamp = System.currentTimeMillis();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public AppUser getSendBy() {
        return sendBy;
    }

    public void setSendBy(AppUser sendBy) {
        this.sendBy = sendBy;
    }

    public AppUser getSendTo() {
        return sendTo;
    }

    public void setSendTo(AppUser sendTo) {
        this.sendTo = sendTo;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public Message() {
    }

    public Message(Builder builder) {
        this.message = builder.message;
        this.sendBy = builder.sendBy;
        this.sendTo = builder.sendTo;
    }

    /**
     * class Builder
     * 
     */
    public static class Builder {
        private String message;
        private AppUser sendBy;
        private AppUser sendTo;
        private Long timestamp;

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder sendBy(AppUser sendBy) {
            this.sendBy = sendBy;
            return this;
        }

        public Builder sendTo(AppUser sendTo) {
            this.sendTo = sendTo;
            return this;
        }

        public Message build() {
            return new Message(this);
        }
    }
}
