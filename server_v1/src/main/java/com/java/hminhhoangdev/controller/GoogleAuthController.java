package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.request.TokenRequestDTO;
import com.java.hminhhoangdev.dto.response.ResponseUser;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.repository.AccountRepository;
import com.java.hminhhoangdev.service.AccountService;
import com.java.hminhhoangdev.webtoken.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
public class GoogleAuthController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RestTemplate restTemplate;


    @Autowired
    private JwtService jwtService;

    private static final String GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";

    @GetMapping("/verify-gg-token")
    public ResponseEntity<?> verifyGoogleToken(@RequestParam("socialAccountId") String socialAccountId, @RequestParam("fullName") String fullName, @RequestParam("email") String email, @RequestParam("avt") String avt, @RequestParam("id_token") String idToken) {
        System.out.println("controler =>>>>>>>>>>" + socialAccountId + fullName + email + avt + idToken);
        String url = GOOGLE_TOKEN_INFO_URL + "?id_token=" + idToken;
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {

                Account account = accountService.createAccountFromGoogle(socialAccountId, fullName, email, avt, socialAccountId);
                Optional<Account> existingAccountOptional = accountRepository.findBySocialAccountId(socialAccountId);
                Account existingAccount = existingAccountOptional.orElse(null);

                UserDetails userDetails = accountService.loadUserByUsername(existingAccount.getUsername());
                String jwtToken = jwtService.generateToken(userDetails);
                String newRefreshToken = jwtService.generateRefreshToken(userDetails);

                ResponseUser userResponse = new ResponseUser(existingAccount.getIdAccount(), existingAccount.getFullName(), existingAccount.getAvt(), jwtToken, newRefreshToken, existingAccount.getEmail(), existingAccount.getAddress(), existingAccount.getDateOfBirth(), existingAccount.getGender(), existingAccount.getPhone(), existingAccount.getRole(), existingAccount.getStatus(), existingAccount.getSocialAccountId(), existingAccount.getUsername());
                return ResponseEntity.ok(userResponse);
            } else {
                return ResponseEntity.status(response.getStatusCode()).body("Invalid token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error verifying token");
        }
    }
}

