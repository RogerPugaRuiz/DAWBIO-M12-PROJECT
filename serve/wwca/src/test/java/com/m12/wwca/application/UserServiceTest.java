package com.m12.wwca.application;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.ChatContact;
import com.m12.wwca.domain.entity.Message;
import com.m12.wwca.domain.entity.Role;
import com.m12.wwca.infrastructure.persistence.MessageRepoMysqlAdapter;
import com.m12.wwca.infrastructure.persistence.RoleRepoMysqlAdapter;
import com.m12.wwca.infrastructure.persistence.UserRepoMysqlAdapter;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    private Logger logger = LoggerFactory.getLogger(UserServiceTest.class);

    @Test
    void testFindMessageById() {

    }

    @Test
    void testGetMessages() {

    }

    @Test
    void testSaveMessage() {

    }

    @Test
    void testAddUser() {
        AppUser appUser = new AppUser.Builder()
                .username("roger22")
                .email("roger@gmail.com")
                .password("roger1234")
                .role(roleService.getRole("admin"))
                .build();
        AppUser user = userService.getUserByUsername(appUser.getUsername());

        userService.deleteUser(user);

        userService.addUser(appUser);
        if (userService.getUserByUsername("roger22") != null) {
            System.out.println("User added");
            assert true;
        } else {
            System.out.println("User not added");
            assert false;
        }
    }

    @Test
    void testAddChatContact() {
        AppUser userExpected = this.userService.getUserByUsername("roger22");
        AppUser contactExpected = this.userService.getUserByUsername("andrés");
        try {
            this.userService.saveChatContact(new ChatContact(
                    userExpected,
                    contactExpected));
            ChatContact chatContact = this.userService.getChatContact(userExpected, contactExpected);
            logger.info("chatContact: " + chatContact.getUser().getUsername());

            assert chatContact.getUser().equals(userExpected);

        } catch (Exception e) {
            logger.info("Chat contact not added");
            assert false;
        }
    }

    @Test
    void testDeleteChatContact() {
        AppUser userExpected = this.userService.getUserByUsername("roger22");
        AppUser contactExpected = this.userService.getUserByUsername("andrés");
        try {
            this.userService.deleteContactChat(
                    this.userService.getChatContact(userExpected, contactExpected));

            // assert chatContact == null;

        } catch (Exception e) {
            logger.info("Chat contact not deleted");
            logger.error(e.getMessage());
            assert false;
        }
    }
}
