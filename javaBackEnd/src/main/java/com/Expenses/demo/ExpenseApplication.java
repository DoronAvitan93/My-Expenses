package com.Expenses.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExpenseApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExpenseApplication.class, args);
        System.out.println();
        System.out.println("Spring boot is on");
        System.out.println("Expenses System is on");

    }
}
