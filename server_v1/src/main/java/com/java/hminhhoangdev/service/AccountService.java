package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.dto.request.ACUpdateByUserRequestDTO;
import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.model.Product;
import com.java.hminhhoangdev.model.Role;
import com.java.hminhhoangdev.util.Gender;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.time.LocalDate;
import java.util.List;

public interface AccountService extends UserDetailsService {
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    Account registerUser(AccountRequestDTO accountRequestDTO);

    List<Account> getListAccountAdmin();

    Account updateAccountByAdmin(int id, AccountRequestDTO accountRequestDTO);

    Account createUserByAdmin(AccountRequestDTO accountRequestDTO);

    Account updateAccountByUser(int id, ACUpdateByUserRequestDTO acUpdateByUserRequestDTO);

    Account createAccountFromFb(AccountRequestDTO accountRequestDTO);
}
