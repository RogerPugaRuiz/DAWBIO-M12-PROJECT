package com.m12.wwca.infrastructure.shared.faker;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.m12.wwca.infrastructure.shared.Utils;
import com.m12.wwca.infrastructure.shared.faker.obj.User;

public class Faker {
    private Gson gson;
    private User[] users;
    private String fileName = "/home/roger/Documents/M12/DAWBIO-M12-PROJECT/serve/wwca/src/main/java/com/m12/wwca/infrastructure/shared/faker/data/users.json";

    public Faker() throws JsonSyntaxException, IOException {
        gson = new Gson();
        users = gson.fromJson(
            Utils.readFile(new File(fileName)), 
            User[].class);
    }
    
    public User[] getUsers() {
        return users;
    }
}
