package com.java.ecommerce_system.Controller;

import com.java.ecommerce_system.Model.Account;
import com.java.ecommerce_system.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Account acc) {
        Optional<Account> user = userRepository.findByUsername(acc.getUsername());

        if (user.isPresent()) {
            Account userObj = user.get();
            if (passwordEncoder.matches(acc.getPassword(), userObj.getPassword())) {
                // Login successful
                return ResponseEntity.ok("Login successful!");
            } else {
                // Incorrect password
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
            }
        } else {
            // User not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PostMapping("/register")
    public Account createUser(@RequestBody Account acc) {
        acc.setPassword(passwordEncoder.encode(acc.getPassword()));
        return userRepository.save(acc);
    }
}