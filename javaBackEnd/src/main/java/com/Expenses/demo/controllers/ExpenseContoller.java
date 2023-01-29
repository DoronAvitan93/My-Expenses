package com.Expenses.demo.controllers;
import com.Expenses.demo.repositories.ExpenseRepository;
import com.Expenses.demo.services.ExpenseService;
import com.Expenses.demo.entities.Expense;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("ExpenseApp")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ExpenseContoller {

    @Autowired
    ExpenseService expenseService;

    @Autowired
    ExpenseRepository expenseRepository;


    //add expense
    //http://localhost:8080/ExpenseApp/addExpense
    @PostMapping("/addExpense")
    @ResponseBody
    public ResponseEntity<String> addExpense(@RequestBody Expense expense) {
        System.out.println("Using addExpense function..."); // print to backend

        Expense expenseRes = expenseService.addExpense(expense);

        System.out.println(expenseRes);
        System.out.println("Expense added successfully!"); // print to backend
        ResponseEntity<String> response = new ResponseEntity<>(HttpStatus.OK); // print to the client
        return response;
    }


    //http://localhost:8080/ExpenseApp/findExpenseUserID/{userID}
    @GetMapping("/findExpenseUserID/{userID}")
    @ResponseBody
    public ResponseEntity<?> findExpenseUserID(@PathVariable int userID) {
        System.out.println("Using findExpenseUserID function..."); // print to backend

        List<Expense> expensesByUserID = expenseService.findExpenseUserID(userID);
        System.out.println(expensesByUserID); // print to backend
        System.out.println();

        ResponseEntity<List<Expense>> responseWrapper = new ResponseEntity<>(expensesByUserID, HttpStatus.OK);
        return responseWrapper;
    }


    //http://localhost:8080/ExpenseApp/deleteExpense/
    @DeleteMapping("/deleteExpense/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteExpense(@PathVariable int id) {
        System.out.println("Using deleteExpense"); // print to backend

        expenseRepository.deleteById(id);
        System.out.println("expense id " + id + "is deleted"); // print to backend
        System.out.println();

        ResponseEntity<String> responseWrapper = new ResponseEntity<>(HttpStatus.OK);
        return responseWrapper;
    }
}
