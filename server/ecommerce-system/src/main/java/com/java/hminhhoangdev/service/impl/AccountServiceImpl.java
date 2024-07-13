package com.java.hminhhoangdev.service.impl;

import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.exception.ResourceNotFoundException;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.model.Role;
import com.java.hminhhoangdev.repository.AccountRepository;
import com.java.hminhhoangdev.repository.RoleRepository;
import com.java.hminhhoangdev.service.AccountService;
import com.java.hminhhoangdev.util.AccountStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> userOptional = accountRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        Account user = userOptional.get();

        UserDetails userDetails = User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().getNameRole())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
        System.out.println("=>>>>User Info : " + userDetails.toString());

        return userDetails;
    }


    @Override
    public Account registerUser(AccountRequestDTO accountRequestDTO) {
        Optional<Role> roleOptional = roleRepository.findById(2); //role id = 2

        if (roleOptional.isEmpty()) {
            throw new ResourceNotFoundException("Default role with id 2 not found");
        }


        Account account = new Account();
        account.setUsername(accountRequestDTO.getUsername());
        account.setPassword(passwordEncoder.encode(accountRequestDTO.getPassword()));
        account.setFullName(accountRequestDTO.getFullName());
        account.setGender(accountRequestDTO.getGender());
        account.setDateOfBirth(accountRequestDTO.getDateOfBirth());
        account.setEmail(accountRequestDTO.getEmail());
        account.setPhone(accountRequestDTO.getPhone());
        account.setAddress(accountRequestDTO.getAddress());
        account.setStatus(AccountStatus.INACTIVE);

        Role role = roleOptional.get();
        account.setRole(role);

        System.out.println("=>>>>User Register<<<<= ");


        return accountRepository.save(account);
    }


}
