package com.m12.wwca.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity(name = "chat_contacts")
@Table(uniqueConstraints = 
    @UniqueConstraint(columnNames = {"user_id", "contact_id"}))
public class ChatContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private AppUser user;

    @OneToOne
    private AppUser contact;

    public ChatContact(AppUser user, AppUser contact) {
        this.user = user;
        this.contact = contact;
    }
    public ChatContact() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public AppUser getContact() {
        return contact;
    }

    public void setContact(AppUser contact) {
        this.contact = contact;
    }
}
