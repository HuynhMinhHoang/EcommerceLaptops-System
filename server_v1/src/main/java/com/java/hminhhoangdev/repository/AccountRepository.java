package com.java.hminhhoangdev.repository;

import com.java.hminhhoangdev.dto.request.AccountRequestDTO;
import com.java.hminhhoangdev.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByUsername(String username);

    Optional<Account> findBySocialAccountId(String socialAccountId);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    List<Account> findByRole_NameRole(String role);

    List<Account> findAllByCreatedAtBetween(Date startDate, Date endDate);

//    List<Account> findAccountsByYearRange(Date startDate, Date endDate);

}
