package com.Expenses.demo.controllers;

import com.Expenses.demo.entities.User;
import com.Expenses.demo.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("ExpenseApp")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    UserService userService;


    //Register user
    //http://localhost:8080/ExpenseApp/addUser
    @PostMapping("/addUser")
    @ResponseBody
    public ResponseEntity<String> addUser(@RequestBody User user) {
        System.out.println("Using addUser function..."); // print to backend

        if (userService.addUser(user) != null) {
            System.out.println("Adding user: " + user); // print to backend
            System.out.println("User added successfully!"); // print to backend
            ResponseEntity<String> response = new ResponseEntity<>(HttpStatus.OK); // print to the client
            return response;

        } else {
            System.out.println("E-Mail already in use"); // print to backend
            ResponseEntity<String> response = new ResponseEntity<>(HttpStatus.BAD_REQUEST); // print to the client
            return response;
        }
    }


    //Login user
    //http://localhost:8080/ExpenseApp/login
    @GetMapping("/login/{email}/{password}")
    @ResponseBody
    public ResponseEntity<?> login(@PathVariable String email, @PathVariable String password) {
        System.out.println("Using Login function..."); // print to backend

        //user ID from DB
        int userID = userService.login(email, password);
        //if user logged in successfully
        if (userID != 0) {
            System.out.println("UserID: " + userID);
            System.out.println("User logged successfully!"); // print to backend
            ResponseEntity<Integer> response = new ResponseEntity<>(userID, HttpStatus.OK); // print to the client
            return response;

        } else {
            ResponseEntity<String> response = new ResponseEntity<>(HttpStatus.BAD_REQUEST); // print to the client
            System.out.println("Error with logging in! " + response); // print to backend
            return response;
        }

    }
}
