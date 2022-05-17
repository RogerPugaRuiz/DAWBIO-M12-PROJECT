package com.m12.wwca.infrastructure.dto;

public class ContactInfo {
    private String contact;
    
    public ContactInfo(String contact) {
        this.contact = contact;
    }
    public ContactInfo() {
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }
}
