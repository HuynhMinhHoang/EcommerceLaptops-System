package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.model.Account;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {
    UserDetails loadUserByUsername(String username);

    String[] getRoles(Account user);

    int addUser(AccountRequestDTO accountRequestDTO);
}
