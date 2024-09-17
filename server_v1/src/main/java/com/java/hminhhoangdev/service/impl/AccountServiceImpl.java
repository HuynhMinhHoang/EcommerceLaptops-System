package com.java.hminhhoangdev.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.java.hminhhoangdev.dto.request.ACUpdateByUserRequestDTO;
import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.exception.ResourceNotFoundException;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.model.Image;
import com.java.hminhhoangdev.model.Role;
import com.java.hminhhoangdev.repository.AccountRepository;
import com.java.hminhhoangdev.repository.RoleRepository;
import com.java.hminhhoangdev.service.AccountService;
import com.java.hminhhoangdev.util.AccountStatus;
import com.java.hminhhoangdev.util.Gender;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private Cloudinary cloudinary;

    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> userOptional = accountRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        Account user = userOptional.get();

        UserDetails userDetails = User.builder().username(user.getUsername()).password(user.getPassword()).roles(user.getRole().getNameRole()).accountExpired(false).accountLocked(false).credentialsExpired(false).disabled(false).build();
        System.out.println("=>>>>User Info : " + userDetails.toString());

        return userDetails;
    }

    private String randomAlphaNumeric(int count) {
        StringBuilder builder = new StringBuilder();
        while (count-- != 0) {
            int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();
    }

    @Override
    public Account registerUser(AccountRequestDTO accountRequestDTO) {
        Optional<Role> roleOptional = roleRepository.findById(2); // role id = 2

        if (roleOptional.isEmpty()) {
            throw new ResourceNotFoundException("Default role with id 2 not found");
        }

        if (accountRepository.existsByUsername(accountRequestDTO.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tài khoản đã được sử dụng!");
        }

        if (accountRepository.existsByEmail(accountRequestDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email đã được sử dụng!");
        }

        if (accountRepository.existsByPhone(accountRequestDTO.getPhone())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Số điện thoại đã được sử dụng!");
        }

        Account account = new Account();
        account.setUsername(accountRequestDTO.getUsername());
        account.setPassword(passwordEncoder.encode(accountRequestDTO.getPassword()));
        account.setFullName(randomAlphaNumeric(15));
        account.setEmail(accountRequestDTO.getEmail());
        account.setPhone(accountRequestDTO.getPhone());
        account.setStatus(AccountStatus.INACTIVE);
        Role role = roleOptional.get();
        account.setRole(role);

        if (accountRequestDTO.getAvt() != null && !accountRequestDTO.getAvt().isEmpty()) {
            try {
                Map<String, Object> uploadResult = cloudinary.uploader().upload(accountRequestDTO.getAvt().getBytes(), ObjectUtils.emptyMap());
                String avatarUrl = (String) uploadResult.get("url");
                account.setAvt(avatarUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload avatar", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Avatar is required");
        }

        return accountRepository.save(account);
    }

    @Override
    public List<Account> getListAccountAdmin() {
        return accountRepository.findAll();
    }

    @Override
    public Account updateAccountByAdmin(int id, AccountRequestDTO accountRequestDTO) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        Optional<Role> roleOptional = roleRepository.findById(accountRequestDTO.getRoleId());

        account.setFullName(accountRequestDTO.getFullName());
        account.setGender(accountRequestDTO.getGender());
        account.setDateOfBirth(accountRequestDTO.getDateOfBirth());
        account.setEmail(accountRequestDTO.getEmail());
        account.setUsername(accountRequestDTO.getUsername());
        if (accountRequestDTO.getPassword() != null && !accountRequestDTO.getPassword().isEmpty()) {
            account.setPassword(passwordEncoder.encode(accountRequestDTO.getPassword()));
        }
        account.setPhone(accountRequestDTO.getPhone());
        account.setAddress(accountRequestDTO.getAddress());
        account.setStatus(accountRequestDTO.getStatus());

        Role role = roleOptional.get();
        account.setRole(role);

        if (accountRequestDTO.getAvt() != null && !accountRequestDTO.getAvt().isEmpty()) {
            try {
                Map<String, Object> uploadResult = cloudinary.uploader().upload(accountRequestDTO.getAvt().getBytes(), ObjectUtils.emptyMap());
                String avatarUrl = (String) uploadResult.get("url");
                account.setAvt(avatarUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload avatar", e);
            }
        }

        return accountRepository.save(account);
    }

    @Override
    public Account createUserByAdmin(AccountRequestDTO accountRequestDTO) {
        if (accountRepository.existsByUsername(accountRequestDTO.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already in use!");
        }
        if (accountRepository.existsByEmail(accountRequestDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use!");
        }
        if (accountRepository.existsByPhone(accountRequestDTO.getPhone())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phone number already in use!");
        }

        Optional<Role> roleOptional = roleRepository.findById(accountRequestDTO.getRoleId());
        Role role = roleOptional.get();


        Account account = new Account();
        account.setFullName(accountRequestDTO.getFullName());
        account.setGender(accountRequestDTO.getGender());
        account.setDateOfBirth(accountRequestDTO.getDateOfBirth());
        account.setEmail(accountRequestDTO.getEmail());
        account.setUsername(accountRequestDTO.getUsername());
        account.setPassword(passwordEncoder.encode(accountRequestDTO.getPassword()));
        account.setPhone(accountRequestDTO.getPhone());
        account.setAddress(accountRequestDTO.getAddress());
        account.setStatus(accountRequestDTO.getStatus());
        account.setRole(role);

        if (accountRequestDTO.getAvt() != null && !accountRequestDTO.getAvt().isEmpty()) {
            try {
                Map<String, Object> uploadResult = cloudinary.uploader().upload(accountRequestDTO.getAvt().getBytes(), ObjectUtils.emptyMap());
                String avatarUrl = (String) uploadResult.get("url");
                account.setAvt(avatarUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload avatar", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Avatar is required");
        }

        return accountRepository.save(account);
    }

    @Override
    public Account updateAccountByUser(int id, ACUpdateByUserRequestDTO acUpdateByUserRequestDTO) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found!"));

        boolean isUpdated = false;

        if (!account.getFullName().equals(acUpdateByUserRequestDTO.getFullName())) {
            account.setFullName(acUpdateByUserRequestDTO.getFullName());
            isUpdated = true;
        }

        if (account.getGender() == null || !account.getGender().equals(acUpdateByUserRequestDTO.getGender())) {
            account.setGender(acUpdateByUserRequestDTO.getGender());
            isUpdated = true;
        }

        if (account.getDateOfBirth() == null || !account.getDateOfBirth().equals(acUpdateByUserRequestDTO.getDateOfBirth())) {
            account.setDateOfBirth(acUpdateByUserRequestDTO.getDateOfBirth());
            isUpdated = true;
        }

        if (account.getAddress() == null || !account.getAddress().equals(acUpdateByUserRequestDTO.getAddress())) {
            account.setAddress(acUpdateByUserRequestDTO.getAddress());
            isUpdated = true;
        }

        if (isUpdated) {
            return accountRepository.save(account);
        } else {
            return account;
        }
    }

    @Override
    public Account createAccountFromFb(AccountRequestDTO accountRequestDTO) {
        Optional<Role> roleOptional = roleRepository.findById(2);
        Account account = new Account();
        account.setUsername(accountRequestDTO.getUsername());
        account.setPassword(passwordEncoder.encode("facebook"));
        account.setEmail(accountRequestDTO.getEmail());
        account.setFullName(accountRequestDTO.getFullName());
        account.setSocialAccountId(accountRequestDTO.getSocialAccountId());
        account.setStatus(accountRequestDTO.getStatus());
        Role role = roleOptional.get();
        account.setRole(role);

        MultipartFile img = accountRequestDTO.getAvt(); // MultipartFile instead of URL
        if (img != null && !img.isEmpty()) {
            try {
                Map<String, Object> uploadResult = cloudinary.uploader().upload(img.getBytes(), ObjectUtils.emptyMap());
                String cloudinaryAvatarUrl = (String) uploadResult.get("url");
                account.setAvt(cloudinaryAvatarUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload avatar", e);
            }
        } else {
            account.setAvt("default-avatar-url");
        }

        return accountRepository.save(account);
    }


    @Override
    public Account createAccountFromGoogle(String socialAccountId, String fullName, String email, String avtUrl, String username) {
        Optional<Account> existingAccountOptional = accountRepository.findBySocialAccountId(socialAccountId);

        if (existingAccountOptional.isPresent()) {
            return existingAccountOptional.get();
        }

        Optional<Role> roleOptional = roleRepository.findById(2);
        if (roleOptional.isEmpty()) {
            throw new ResourceNotFoundException("Default role with id 2 not found");
        }

        System.out.println("setFullName" + fullName);
        System.out.println("setEmail" + email);
        System.out.println("setSocialAccountId" + socialAccountId);

        Account account = new Account();
        account.setSocialAccountId(socialAccountId);
        account.setFullName(fullName);
        account.setEmail(email);
        account.setAvt(avtUrl);
        account.setUsername(socialAccountId);
        account.setPassword(passwordEncoder.encode("google"));
        Role role = roleOptional.get();
        account.setRole(role);
        account.setStatus(AccountStatus.INACTIVE);


        return accountRepository.save(account);
    }


}
