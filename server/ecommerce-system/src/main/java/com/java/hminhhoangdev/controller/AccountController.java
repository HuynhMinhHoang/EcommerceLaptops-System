package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.dto.response.ResponseData;
import com.java.hminhhoangdev.dto.response.ResponseError;
import com.java.hminhhoangdev.dto.response.ResponseLoginDTO;
import com.java.hminhhoangdev.exception.ResourceNotFoundException;
import com.java.hminhhoangdev.repository.AccountRepository;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.repository.RoleRepository;
import com.java.hminhhoangdev.service.AccountService;
import com.java.hminhhoangdev.webtoken.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class AccountController {
    @Autowired
    private AccountRepository userRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountRequestDTO accountRequestDTO) {
        try {
            UserDetails userDetails = accountService.loadUserByUsername(accountRequestDTO.getUsername());

            if (!passwordEncoder.matches(accountRequestDTO.getPassword(), userDetails.getPassword())) {
                throw new ResourceNotFoundException("Invalid credentials");
            }

            String token = jwtService.generateToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            Account account = userRepository.findByUsername(accountRequestDTO.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

            ResponseLoginDTO responseLogin = new ResponseLoginDTO(token, refreshToken, account);

            return ResponseEntity.ok(responseLogin);

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during login");
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestParam String refreshToken) {
        try {

            Claims claims = jwtService.extractAllClaims(refreshToken);
            String username = claims.getSubject();

            Account account = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (jwtService.isTokenExpired(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }

            UserDetails userDetails = accountService.loadUserByUsername(username);
            String newToken = jwtService.generateToken(userDetails);
            String newRefreshToken = jwtService.generateRefreshToken(userDetails);

            ResponseLoginDTO responseLogin = new ResponseLoginDTO(newToken, newRefreshToken, account);

            return ResponseEntity.ok(responseLogin);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error refreshing token");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody AccountRequestDTO accountRequestDTO) {
        try {
            accountService.registerUser(accountRequestDTO);
            return ResponseEntity.ok("Account created successfully!");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering account");
        }
    }


    //test


//    @PostMapping("/add")
//    public ResponseData<Integer> addUser(@Valid @RequestBody AccountRequestDTO accountRequestDTO) {
//        try {
//            // Logic to add user
//            accountService.addUser(accountRequestDTO);
//            return new ResponseData(HttpStatus.CREATED.value(), "User added successfully!");
//        } catch (Exception e) {
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Save user failed! [" + e.getMessage() + "]");
//        }
//    }

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

//    @GetMapping("/{userID}")
//    public ResponseData<String> getUserById(@Min(1) @PathVariable int userID) {
//        try {
//            // Logic to fetch user by ID
//            return new ResponseData(HttpStatus.OK.value(), "user", new AccountRequestDTO(
//                    "hoang", "123", "ADMIN", "hoangminh", "hminhhoang@gmail.com",
//                    "0979042815", "hcm"));
//        } catch (Exception e) {
//            return new ResponseError(HttpStatus.OK.value(), e.getMessage());
//        }
//    }
//
//    @GetMapping("/list")
//    public ResponseData<String> getListUser(@RequestParam(required = false) String email, @RequestParam(defaultValue = "0") int pageNo, @Min(10) @RequestParam(defaultValue = "20") int pageSize) {
//        try {
//            // Logic to fetch list of users
//            return new ResponseData(HttpStatus.OK.value(), "data", List.of(new AccountRequestDTO(
//                    "hoang", "123", "ADMIN", "hoangminh", "hminhhoang@gmail.com",
//                    "0979042815", "hcm"), new AccountRequestDTO(
//                    "thuyen", "123", "USER", "thuyenngao", "thuyenngao@gmail.com",
//                    "0979042815", "hcm")));
//        } catch (Exception e) {
//            return new ResponseError(HttpStatus.OK.value(), e.getMessage());
//        }
//    }
}