package com.m12.wwca.domain.repo;

import java.util.ArrayList;
import java.util.List;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.ChatContact;

public interface ChatContactRepo {
    public void save(ChatContact chatContacts);
    public List<ChatContact> findByUser(AppUser user);
    public List<ChatContact> findByContact(AppUser contact);
    public void delete(ChatContact chatContacts);
    public List<ChatContact> findAll();
    public ChatContact findByUserAndContact(AppUser user, AppUser contact);
}
