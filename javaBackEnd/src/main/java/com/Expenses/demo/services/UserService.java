package com.Expenses.demo.services;

import com.Expenses.demo.entities.User;
import com.Expenses.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    public User addUser(User user) {
        try {
            //checking if email already in use
            if (userRepository.findByEmail(user.getEmail()) == null) {
                //if not - then add to the DB (register)
                userRepository.save(user);
                return user;
            } else {
                //if email already exist
                System.out.println("Email already exist");
                return null;
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public int login(String email, String password) {
        try {
            //checking if user exist by email and password
            User resUser = userRepository.findByEmailAndPassword(email, password);
            System.out.println(resUser);
            return resUser.getId();

        } catch (Exception e) {
            System.out.println("error: " + e);
        }
        return 0;
    }
}
