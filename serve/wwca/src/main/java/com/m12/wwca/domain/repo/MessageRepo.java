package com.m12.wwca.domain.repo;

import java.util.List;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.Message;

public interface MessageRepo {
    public void save(Message message);
    public Message findById(Long id);
    public List<Message> findAll();
    public List<Message> findBySender(AppUser sender);
    public List<Message> findBySenderAndReceiver(AppUser sender, AppUser receiver);
    public List<Message> findByReceiver(AppUser receiver);
    public void deleteMessages(List<Message> messages);
    
}
