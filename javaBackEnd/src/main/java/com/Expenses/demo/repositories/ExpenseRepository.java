package com.Expenses.demo.repositories;


import com.Expenses.demo.entities.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    List<Expense> findAll();

    Expense deleteById(int id);

    List<Expense> findByUserID(int userID);
}
