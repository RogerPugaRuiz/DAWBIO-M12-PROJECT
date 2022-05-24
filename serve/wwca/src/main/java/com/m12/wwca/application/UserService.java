package com.m12.wwca.application;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.ChatContact;
import com.m12.wwca.domain.entity.Message;
import com.m12.wwca.domain.entity.Role;
import com.m12.wwca.domain.repo.ChatContactRepo;
import com.m12.wwca.domain.repo.MessageRepo;
import com.m12.wwca.domain.repo.RoleRepo;
import com.m12.wwca.domain.repo.UserRepo;
import com.m12.wwca.infrastructure.dto.SignUpDto;
import com.m12.wwca.infrastructure.dto.UserManageDto;
import com.m12.wwca.infrastructure.persistence.MessageRepoMysqlAdapter;
import com.m12.wwca.infrastructure.shared.Cryptography;
import com.m12.wwca.infrastructure.shared.Utils;
import com.m12.wwca.infrastructure.shared.jwt.UserJWT;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public class UserService {

    private RoleRepo roleRepo; // RoleRepoMysqlAdapter
    private UserRepo userRepo; // UserRepoMysqlAdapter
    private MessageRepo messageRepo; // MessageRepoMysqlAdapter
    private ChatContactRepo chatContactRepo; // ChatContactRepoMysqlAdapter

    @Autowired
    public UserService(RoleRepo roleRepo, UserRepo userRepo, MessageRepo messageRepo, ChatContactRepo chatContactRepo) {
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
        this.messageRepo = messageRepo;
        this.chatContactRepo = chatContactRepo;
    }

    // Logger debug
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Transactional
    /**
     * Add a new user
     * 
     * @param name
     * @param email
     * @param password
     * @param role
     */
    public void addUser(AppUser user) {
        // info add new user
        logger.info("add new user: " + user.getUsername());
        userRepo.addUser(user);

        // try to add user to database and if it fails, throw exception
    }
    @Transactional
    /**
     * Get user by id
     * @param id Long
     * @return AppUser
     *
     */
    public AppUser getUser(String id){
        // info get user by id
        logger.info("get user by id: " + id);
        return userRepo.getUser(id);
    }

    @Transactional
    /**
     * Get a user by email
     * 
     * @param email
     * @return AppUser
     */
    public AppUser getUserByEmail(String email) {
        // info get user by email
        logger.info("get user by email: " + email);
        return userRepo.getUserByEmail(email);
    }

    @Transactional
    /**
     * Get user with filter
     * 
     * @param username
     * @param email
     * @param role
     * @return List<AppUser>
     */
    public List<AppUser> getUsersFilter(String username, String email, String role) {
        Role roleId = roleRepo.getRole(role);

        // info get users with filter
        logger.info("get users with filter: " + username + ", " + email + ", " + role);
        return userRepo.getUsersFilter("%" + username + "%", "%" + email + "%", roleId);
    }

    @Transactional
    /**
     * Get all users
     * 
     * @return List<AppUser>
     */
    public List<AppUser> getUsers() {
        // info get all users
        logger.info("get all users");
        return userRepo.getUsers();
    }

    @Transactional
    /**
     * Method to login with email or username
     * 
     * @param id
     * @param password
     * @return true if login is successful
     */
    public String login(String id, String password) {
        // info login
        logger.info("login: " + id);
        if (userRepo.login(id, password)) {
            if (Utils.isAnEmail(id)) {
                AppUser user = userRepo.getUserByEmail(id);
                return UserJWT.getJWT(user);
            } else {
                AppUser user = userRepo.getUserByUsername(id);
                return UserJWT.getJWT(user);
            }
            
        } else {
            return null;
        }

    }

    @Transactional
    /**
     * Method to delete user
     * 
     * @param user
     * @return true if user is deleted
     *
     */
    public void deleteUser(AppUser user) {
        // info delete user
        if (user != null) {
            logger.info("delete user: " + user.getUsername());
            List<ChatContact> chatContacts = chatContactRepo.findByUser(user);
            chatContacts.addAll(chatContactRepo.findByContact(user));
            for (ChatContact chatContact : chatContacts) {
                chatContactRepo.delete(chatContact);
                logger.info("delete chat contact: " + chatContact.getId());
            }
            List<Message> messages = messageRepo.findBySender(user);
            messages.addAll(messageRepo.findByReceiver(user));
            messageRepo.deleteMessages(messages);

            logger.info("messages deleted" + messageRepo.findBySender(user));
            userRepo.deleteUser(user);
        }
    }

    @Transactional
    /**
     * Method to get user by username
     * 
     * @param username
     * @return AppUser
     *
     */
    public AppUser getUserByUsername(String username) {
        // info get user by username
        logger.info("get user by username: " + username);
        return userRepo.getUserByUsername(username);
    }

    /**
     * Method to get all messages
     * @return List<Message>
     *
     */
    public List<Message> getMessages() {
        // info get all messages
        logger.info("get all messages");
        return messageRepo.findAll();
    }

    @Transactional
    /**
     * Method to save message
     * @param message
     */
    public void saveMessage(Message message) {
        // info save message
        logger.info("save message: " + message.getId());
        messageRepo.save(message);
    }

    @Transactional
    /**
     * Method to update user
     * @param user
     * @return void
     */
    public void updateUser(AppUser user) {
        // info update user
        logger.info("update user: " + user.getUsername());
        userRepo.updateUser(user);
    }


    @Transactional
    /**
     * Method to get all chat contacts
     * @return List<ChatContact>
     *
     */
    public List<ChatContact> getChatContacts() {
        // info get all chat contacts
        logger.info("get all chat contacts");
        return chatContactRepo.findAll();
    }

    @Transactional
    /**
     * Method to save chat contact
     * @param chatContact
     */
    public void saveChatContact(ChatContact chatContact) {
        // info save chat contact
        logger.info("save chat contact on " + chatContact.getUser().getUsername());
        chatContactRepo.save(chatContact);
    }

    @Transactional
    /**
     * Method to get chat contact by id
     * @param user
     * @return ChatContact
     *
     */
    public ArrayList<ChatContact> getContactContactChat(AppUser user) {
        // info get chat contact by id
        logger.info("get chat contact by id: " + user.getId());
        return (ArrayList<ChatContact>) chatContactRepo.findByContact(user);
    }

    @Transactional
    /**
     * Method to get user by id
     * @param user
     * @return ChatContact
     *
     */
    public ArrayList<ChatContact> getUserContactChat(AppUser user) {
        // info get user by id
        logger.info("get user by id: " + user.getId());
        return (ArrayList<ChatContact>) chatContactRepo.findByUser(user);
    }

    @Transactional
    /**
     * Method to delete chat contact
     * @param chatContact
     * @return void
     *
     */
    public void deleteContactChat(ChatContact chatContact) {
        // info delete chat contact
        chatContactRepo.delete(chatContact);
        logger.info("delete chat contact: " + chatContact.getId());
    }

    @Transactional
    /**
     * Method to get chat contact by user and contact
     * @param id
     * @return ChatContact
     */
    public ChatContact getChatContact(AppUser user, AppUser contact) {
        // info get chat contact by user and contact
        logger.info("get chat contact by user and contact: " + user.getUsername() + ", " + contact.getUsername());
        return chatContactRepo.findByUserAndContact(user, contact);
    }

    @Transactional
    /**
     * Method to delete users with ids
     * @param ids
     * @return void
     */
    public void deleteUsers(List<String> ids) {
        // info delete users with ids
        logger.info("delete users with ids: " + ids);
        userRepo.deleteUsers(ids);
    }


    /**
     * Method find message by id
     * @param id
     * @return Message
     *
     */
    public Message findMessageById(Long id) {
        // info find message by id
        logger.info("find message by id: " + id);
        return messageRepo.findById(id);
    }

    /**
     * Method find message by sender
     * @param sender
     */
    public List<Message> findMessageBySender(AppUser sender) {
        // info find message by sender
        logger.info("find message by sender: " + sender);
        return messageRepo.findBySender(sender);
    }

    /**
     * Method find message by sender and receiver
     * @param sender
     * @param receiver
     */
    public List<Message> findMessageBySenderAndReceiver(AppUser sender, AppUser receiver) {
        // info find message by sender and receiver
        logger.info("find message by sender and receiver: " + sender + ", " + receiver);
        return messageRepo.findBySenderAndReceiver(sender, receiver);
    }


}
