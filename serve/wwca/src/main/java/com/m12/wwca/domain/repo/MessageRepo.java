package com.m12.wwca.domain.repo;

import java.util.List;

import com.m12.wwca.domain.entity.Message;

public interface MessageRepo {
    public void save(Message message);
    public Message findById(Long id);
    public List<Message> findAll();
    public List<Message> findBySender(String sender);
    
}
