package com.java.hminhhoangdev.service.impl;

import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.exception.ResourceNotFoundException;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.repository.AccountRepository;
import com.java.hminhhoangdev.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            Account userObj = user.get();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(getRoles(userObj))
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    @Override
    public String[] getRoles(Account user) {
        if (user.getRole() == null || user.getRole().getNameRole() == null) {
            return new String[]{"USER"};
        }

        return user.getRole().getNameRole().split(",");
    }

    @Override
    public int addUser(AccountRequestDTO accountRequestDTO) {
        System.out.println("Save user service");
        if (accountRequestDTO.getFullName().equals("Hoang")) {
            throw new ResourceNotFoundException("Hoang khong ton tai!");
        }
        return 0;
    }
}
