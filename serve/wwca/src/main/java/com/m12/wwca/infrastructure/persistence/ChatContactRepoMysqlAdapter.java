package com.m12.wwca.infrastructure.persistence;

import java.util.ArrayList;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.ChatContact;
import com.m12.wwca.domain.repo.ChatContactRepo;

import org.springframework.stereotype.Repository;

@Repository
public class ChatContactRepoMysqlAdapter implements ChatContactRepo{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void save(ChatContact chatContacts) {
        // message.setId(1L);
        entityManager.persist(chatContacts);
    }


    @Override
    public void delete(ChatContact chatContacts) {
        entityManager.remove(entityManager.contains(chatContacts) ? chatContacts : entityManager.merge(chatContacts));
    }


    @Override
    public ChatContact findByUser(AppUser user) {
        ChatContact auxChatContact = entityManager.createQuery("SELECT c FROM chat_contacts c WHERE c.user = :user", ChatContact.class)
                .setParameter("user", user)
                .getSingleResult();
        return auxChatContact;
    }


    @Override
    public ChatContact findByContact(AppUser contact) {
        ChatContact auxChatContact = entityManager.createQuery("SELECT c FROM chat_contacts c WHERE c.contact = :contact", ChatContact.class)
                .setParameter("contact", contact)
                .getSingleResult();
        return auxChatContact;
    }


    @Override
    public ArrayList<ChatContact> findAll() {
        ArrayList<ChatContact> chatContacts = (ArrayList<ChatContact>) entityManager.createQuery("SELECT c FROM chat_contacts c", ChatContact.class).getResultList();
        return chatContacts;
    }
    
}
