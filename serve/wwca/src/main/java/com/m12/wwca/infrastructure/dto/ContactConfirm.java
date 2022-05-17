package com.m12.wwca.infrastructure.dto;

public class ContactConfirm {
    private String contactJwt;
    private Boolean confirm;

    public ContactConfirm(String contactJwt, Boolean confirm) {
        this.contactJwt = contactJwt;
        this.confirm = confirm;
    }
    public ContactConfirm() {
    }

    public String getContactJwt() {
        return contactJwt;
    }

    public void setContactJwt(String contactJwt) {
        this.contactJwt = contactJwt;
    }

    public Boolean getConfirm() {
        return confirm;
    }

    public void setConfirm(Boolean confirm) {
        this.confirm = confirm;
    }
    
}
