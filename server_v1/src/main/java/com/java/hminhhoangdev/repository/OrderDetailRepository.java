package com.java.hminhhoangdev.repository;

import com.java.hminhhoangdev.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}
