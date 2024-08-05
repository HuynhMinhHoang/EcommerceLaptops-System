package com.java.hminhhoangdev.repository;

import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.model.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentTypeRepository extends JpaRepository<PaymentType, Integer> {
}
