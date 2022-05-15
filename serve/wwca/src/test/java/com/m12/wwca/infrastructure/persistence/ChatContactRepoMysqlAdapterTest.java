package com.m12.wwca.infrastructure.persistence;

import java.util.ArrayList;

import javax.transaction.Transactional;

import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.ChatContact;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ChatContactRepoMysqlAdapterTest {
    @Autowired
    private UserRepoMysqlAdapter userRepoMysqlAdapter;
    // private ChatContactRepoMysqlAdapter chatContactRepoMysqlAdapter;
    @Autowired
    private ChatContactRepoMysqlAdapter chatContactRepoMysqlAdapter;

    Logger logger = LoggerFactory.getLogger(ChatContactRepoMysqlAdapterTest.class);
    @Test
    void testDelete() {

    }

    @Test
    void testFindAll() {
        ArrayList<ChatContact> chatContacts = (ArrayList<ChatContact>) chatContactRepoMysqlAdapter.findAll();
        for (ChatContact chatContact : chatContacts) {
            logger.info("contact user: " + chatContact.getUser().getUsername());
        }
    }

    @Test
    void testFindByContact() {

    }

    @Test
    void testFindByUser() {

    }
}
