package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.dto.request.OrderRequestDTO;
import com.java.hminhhoangdev.model.Order;
import com.java.hminhhoangdev.model.OrderDetail;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;

public interface OrderService {
    Order createOrderVNPay(HttpServletRequest request, int paymentTypeId);

    Order createOrderCOD(OrderRequestDTO request);

    void updateOrderPaymentStatus(int orderId, boolean status_pay);

    List<Order> getOrdersByAccountId(int accountId);


}
