package com.java.hminhhoangdev.repository;

import com.java.hminhhoangdev.model.Order;
import com.java.hminhhoangdev.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    List<OrderDetail> findByOrder(Order order);
}
