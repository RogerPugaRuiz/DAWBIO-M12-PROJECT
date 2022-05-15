package com.m12.wwca.domain.repo;

import java.util.ArrayList;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.ChatContact;

public interface ChatContactRepo {
    public void save(ChatContact chatContacts);
    public ChatContact findByUser(AppUser user);
    public ChatContact findByContact(AppUser contact);
    public void delete(ChatContact chatContacts);
    public ArrayList<ChatContact> findAll();
}
