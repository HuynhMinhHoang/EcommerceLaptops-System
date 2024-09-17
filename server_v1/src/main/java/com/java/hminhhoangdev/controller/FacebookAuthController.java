package com.java.hminhhoangdev.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.dto.request.TokenRequestDTO;
import com.java.hminhhoangdev.dto.response.ResponseUser;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.model.Role;
import com.java.hminhhoangdev.repository.AccountRepository;
import com.java.hminhhoangdev.service.AccountService;
import com.java.hminhhoangdev.util.AccountStatus;
import com.java.hminhhoangdev.util.Gender;
import com.java.hminhhoangdev.webtoken.JwtService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
public class FacebookAuthController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private Cloudinary cloudinary;

    private static final String FB_VERIFY_URL = "https://graph.facebook.com/me?access_token=";
    private static final String FB_INFO_ID_USER = "https://graph.facebook.com/USER-ID?fields=id,name,email,picture&access_token=";
    private static final Logger logger = LoggerFactory.getLogger(FacebookAuthController.class);
    private final JwtService jwtService;

    public FacebookAuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/verify-fb-token")
    public ResponseEntity<?> verifyFacebookToken(@RequestBody TokenRequestDTO tokenRequest) {
        String token = tokenRequest.getToken();
        String email = tokenRequest.getEmail();
        String url = FB_VERIFY_URL + token;
        logger.info("Facebook API URL: {}", url);

        RestTemplate restTemplate = new RestTemplate();
        try {
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);
            logger.info("Facebook API response: {}", response);

            if (response != null && response.has("id")) {
                String facebookId = response.get("id").asText();
                logger.info("Facebook ID: {}", facebookId);

                String userInfoUrl = FB_INFO_ID_USER.replace("USER-ID", facebookId) + token;
                JsonNode fullInfoResponse = restTemplate.getForObject(userInfoUrl, JsonNode.class);
                logger.info("Full info from Facebook: {}", fullInfoResponse);

                if (fullInfoResponse != null && fullInfoResponse.has("id")) {
                    String fullName = fullInfoResponse.get("name").asText();
                    String profilePicUrl = fullInfoResponse.get("picture").get("data").get("url").asText();
                    Optional<Account> existingAccountOptional = accountRepository.findBySocialAccountId(facebookId);
                    Account existingAccount = existingAccountOptional.orElse(null);

                    if (existingAccount == null) {
                        AccountRequestDTO accountRequestDTO = new AccountRequestDTO();
                        accountRequestDTO.setFullName(fullName);
                        accountRequestDTO.setEmail(email);
                        accountRequestDTO.setUsername(facebookId);
                        accountRequestDTO.setPassword("");
                        accountRequestDTO.setStatus(AccountStatus.INACTIVE);
                        accountRequestDTO.setSocialAccountId(facebookId);
                        accountRequestDTO.setRoleId(2);
                        accountRequestDTO.setAvt(null);

                        existingAccount = accountService.createAccountFromFb(accountRequestDTO);

                        if (profilePicUrl != null) {
                            try {
                                Map<String, Object> uploadResult = cloudinary.uploader().upload(profilePicUrl, ObjectUtils.emptyMap());
                                String avatarUrl = (String) uploadResult.get("url");
                                existingAccount.setAvt(avatarUrl);
                                accountRepository.save(existingAccount);
                            } catch (IOException e) {
                                logger.error("Failed to upload avatar to Cloudinary: {}", e.getMessage());
                            }
                        }
                    }

                    UserDetails userDetails = accountService.loadUserByUsername(existingAccount.getUsername());
                    String jwtToken = jwtService.generateToken(userDetails);
                    String newRefreshToken = jwtService.generateRefreshToken(userDetails);


                    ResponseUser userResponse = new ResponseUser(existingAccount.getIdAccount(), fullInfoResponse.get("name").asText(), existingAccount.getAvt(), jwtToken, newRefreshToken, existingAccount.getEmail(), existingAccount.getAddress(), existingAccount.getDateOfBirth(), existingAccount.getGender(), existingAccount.getPhone(), existingAccount.getRole(), existingAccount.getStatus(), existingAccount.getSocialAccountId(), existingAccount.getUsername());
                    return ResponseEntity.ok(userResponse);
                } else {
                    logger.error("Facebook API full info response is invalid");
                    return ResponseEntity.status(401).body("Invalid token");
                }
            } else {
                logger.error("Facebook API response is invalid");
                return ResponseEntity.status(401).body("Invalid token");
            }
        } catch (Exception e) {
            logger.error("Error verifying token: {}", e.getMessage());
            return ResponseEntity.status(500).body("Error verifying token");
        }
    }


}
