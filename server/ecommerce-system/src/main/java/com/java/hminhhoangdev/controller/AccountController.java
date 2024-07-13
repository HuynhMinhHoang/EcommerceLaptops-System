package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.dto.response.ResponseData;
import com.java.hminhhoangdev.dto.response.ResponseError;
import com.java.hminhhoangdev.dto.response.ResponseSuccess;
import com.java.hminhhoangdev.repository.AccountRepository;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.service.AccountService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class AccountController {
    @Autowired
    private AccountRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Account acc) {
        System.out.println(">>>>>>>>>>>>> Login");
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


    //test

    @Autowired
    private AccountService accountService;

    @PostMapping("/add")
    public ResponseData<Integer> addUser(@Valid @RequestBody AccountRequestDTO accountRequestDTO) {
        try {
            // Logic to add user
            accountService.addUser(accountRequestDTO);
            return new ResponseData(HttpStatus.CREATED.value(), "User added successfully!");
        } catch (Exception e) {
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Save user failed! [" + e.getMessage() + "]");
        }
    }

    @PutMapping("/update/{userID}")
    public ResponseData<?> updateUser(@Min(1) @PathVariable int userID, @Valid @RequestBody AccountRequestDTO accountRequestDTO) {
        try {
            // Logic to update user
            System.out.println("request id user " + userID);
            return new ResponseData(HttpStatus.ACCEPTED.value(), "User updated successfully!");
        } catch (Exception e) {
            return new ResponseError(HttpStatus.ACCEPTED.value(), e.getMessage());
        }
    }

    @PatchMapping("/update/{userID}")
    public ResponseData<?> changeStatus(@Min(1) @PathVariable int userID, @Valid @RequestParam(required = false) int status) {
        try {
            // Logic to change user status
            System.out.println("request change user " + userID + ", status " + status);
            return new ResponseData(HttpStatus.ACCEPTED.value(), "User status changed successfully!");
        } catch (Exception e) {
            return new ResponseError(HttpStatus.ACCEPTED.value(), e.getMessage());
        }
    }

    @DeleteMapping("/delete/{userID}")
    public ResponseData<Integer> deleteUser(@Min(1) @PathVariable int userID) {
        try {
            // Logic to delete user
            System.out.println("request delete user " + userID);
            return new ResponseData(HttpStatus.NO_CONTENT.value(), "User deleted successfully!");
        } catch (Exception e) {
            return new ResponseError(HttpStatus.NO_CONTENT.value(), e.getMessage());
        }
    }

    @GetMapping("/{userID}")
    public ResponseData<String> getUserById(@Min(1) @PathVariable int userID) {
        try {
            // Logic to fetch user by ID
            return new ResponseData(HttpStatus.OK.value(), "user", new AccountRequestDTO(
                    "hoang", "123", "ADMIN", "hoangminh", "hminhhoang@gmail.com",
                    "0979042815", "hcm"));
        } catch (Exception e) {
            return new ResponseError(HttpStatus.OK.value(), e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseData<String> getListUser(@RequestParam(required = false) String email, @RequestParam(defaultValue = "0") int pageNo, @Min(10) @RequestParam(defaultValue = "20") int pageSize) {
        try {
            // Logic to fetch list of users
            return new ResponseData(HttpStatus.OK.value(), "data", List.of(new AccountRequestDTO(
                    "hoang", "123", "ADMIN", "hoangminh", "hminhhoang@gmail.com",
                    "0979042815", "hcm"), new AccountRequestDTO(
                    "thuyen", "123", "USER", "thuyenngao", "thuyenngao@gmail.com",
                    "0979042815", "hcm")));
        } catch (Exception e) {
            return new ResponseError(HttpStatus.OK.value(), e.getMessage());
        }
    }
}