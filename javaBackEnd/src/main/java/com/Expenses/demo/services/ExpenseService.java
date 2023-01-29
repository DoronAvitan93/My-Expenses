package com.Expenses.demo.services;


import com.Expenses.demo.entities.Expense;
import com.Expenses.demo.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class ExpenseService {

    @Autowired
    ExpenseRepository expenseRepository;

    //Register service
    public Expense addExpense(Expense expense) {
        try {
            expenseRepository.save(expense);
            return expense;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //find user expenses
    public List<Expense> findExpenseUserID(int userID) {
        try {
            return expenseRepository.findByUserID(userID);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
