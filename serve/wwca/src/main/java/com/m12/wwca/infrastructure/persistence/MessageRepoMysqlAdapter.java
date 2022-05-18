package com.m12.wwca.infrastructure.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.Message;
import com.m12.wwca.domain.repo.MessageRepo;

import org.springframework.stereotype.Repository;

@Repository
public class MessageRepoMysqlAdapter implements MessageRepo {

    @PersistenceContext
    // EntityManager is a container-managed entity manager
    private EntityManager entityManager;

    @Override
    public void save(Message message) {
        // message.setId(1L);
        entityManager.persist(message);
    }

    @Override
    public Message findById(Long id) {
        Message auxMessage = entityManager.createQuery("SELECT m FROM messages m WHERE m.id = :id", Message.class)
                .setParameter("id", id)
                .getSingleResult();
        return auxMessage;
    }

    @Override
    public List<Message> findAll() {
        List<Message> messages = entityManager.createQuery("SELECT m FROM messages m", Message.class).getResultList();
        return messages;
    }

    @Override
    public List<Message> findBySender(AppUser sender) {
        List<Message> messages = entityManager.createQuery("SELECT m FROM messages m WHERE m.sendBy = :sender", Message.class)
                .setParameter("sender", sender)
                .getResultList();
        return messages;
    }

    @Override
    public List<Message> findBySenderAndReceiver(AppUser sender, AppUser receiver) {
        List<Message> messages = entityManager.createQuery("SELECT m FROM messages m WHERE m.sendBy = :sender AND m.sendTo = :receiver", Message.class)
                .setParameter("sender", sender)
                .setParameter("receiver", receiver)
                .getResultList();
        return messages;
    }
}
