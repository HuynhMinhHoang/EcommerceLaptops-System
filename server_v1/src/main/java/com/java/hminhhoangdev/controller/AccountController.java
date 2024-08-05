package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.dto.request.ProductRequestDTO;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
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

    @PostMapping("/user/login")
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

    @PostMapping("/user/refresh-token")
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

    @PostMapping(value = "/user/register", consumes = "multipart/form-data")
    public ResponseEntity<ResponseData<String>> createUser(@Valid @ModelAttribute AccountRequestDTO accountRequestDTO) {
        try {
            accountService.registerUser(accountRequestDTO);
            return ResponseEntity.ok(new ResponseData<>(HttpStatus.OK.value(), "Đăng ký thành công!"));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ResponseData<>(e.getStatusCode().value(), e.getReason()));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseData<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/admin/list-user")
    public List<Account> getAllAccounts() {
        return accountService.getListAccountAdmin();
    }

    @PostMapping(value = "admin/user/create-user", consumes = "multipart/form-data")
    public ResponseEntity<ResponseData<String>> createUserByAdmin(@Valid @ModelAttribute AccountRequestDTO accountRequestDTO) {
        try {
            accountService.createUserByAdmin(accountRequestDTO);
            return ResponseEntity.ok(new ResponseData<>(HttpStatus.OK.value(), "Create Account successful!"));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ResponseData<>(e.getStatusCode().value(), e.getReason()));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseData<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @PutMapping(value = "admin/user/{id}", consumes = "multipart/form-data")
    public ResponseData<?> updateUser(@PathVariable int id, @ModelAttribute AccountRequestDTO accountRequestDTO) {
        try {
            accountService.updateAccountByAdmin(id, accountRequestDTO);
            return new ResponseData<>(HttpStatus.OK.value(), "Account updated successfully!");
        } catch (ResponseStatusException e) {
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        } catch (Exception e) {
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }


}