package com.Expenses.demo.repositories;
import com.Expenses.demo.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {



    User save(User user);

    User findByEmailAndPassword(String email, String password);

    User findByEmail(String email);
}
