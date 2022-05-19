package com.m12.wwca.infrastructure.shared.sortedArray;

import java.util.ArrayList;

import com.m12.wwca.application.UserService;
import com.m12.wwca.domain.entity.AppUser;
import com.m12.wwca.domain.entity.Message;
import com.m12.wwca.infrastructure.dto.MessageDto;
import com.m12.wwca.infrastructure.shared.Utils;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class SortedArrayTest {

    @Autowired()
    private UserService userService;


    Logger logger = LoggerFactory.getLogger(SortedArrayTest.class);

    @Test
    public void testSorted(){
        // AppUser user = userService.getUserByUsername("Roger");
        // AppUser user2 = userService.getUserByUsername("alorenc0");

        // ArrayList<Message> messages = (ArrayList<Message>) userService.findMessageBySenderAndReceiver(user, user2);
        // ArrayList<MessageDto> messageInfo = (ArrayList<MessageDto>) Utils.messagesToMessageInfo(messages);

        // logger.info("messages: " + messageInfo);
    }
}
