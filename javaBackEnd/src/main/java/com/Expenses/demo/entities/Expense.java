package com.Expenses.demo.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity(name = "expense")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Expense {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    @NonNull
    private String title;

    @Column(name = "price")
    @NonNull
    private int price;

    @Column(name = "date")
    @NonNull
    private LocalDate date;

    //using userID to determine which expense belong to specific user
    @Column(name = "userid")
    @NonNull
    private Integer userID;
}
