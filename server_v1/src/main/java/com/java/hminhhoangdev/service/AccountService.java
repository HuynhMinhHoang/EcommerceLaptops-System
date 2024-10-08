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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface AccountService extends UserDetailsService {
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    Account registerUser(AccountRequestDTO accountRequestDTO);

    Page<Account> getListAccountAdmin(Pageable pageable);

    Account updateAccountByAdmin(int id, AccountRequestDTO accountRequestDTO);

    Account createUserByAdmin(AccountRequestDTO accountRequestDTO);

    Account updateAccountByUser(int id, ACUpdateByUserRequestDTO acUpdateByUserRequestDTO);

    Account createAccountFromFb(AccountRequestDTO accountRequestDTO);

    Account createAccountFromGoogle(String socialAccountId, String fullName, String email, String avtUrl, String username);

    List<Account> getAccountsByRole(String role);

    Map<Integer, Long> countAccountsByMonthInYear(int year);

    Map<String, Long> countActiveAndInactiveAccountsByYear(int year);
}
