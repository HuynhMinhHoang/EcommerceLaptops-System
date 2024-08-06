package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.dto.request.OrderRequestDTO;
import com.java.hminhhoangdev.model.Order;
import jakarta.servlet.http.HttpServletRequest;

public interface OrderService {
    Order createOrderVNPay(HttpServletRequest request, int paymentTypeId);

    Order createOrderCOD(OrderRequestDTO request);

    void updateOrderPaymentStatus(int orderId, boolean status_pay);
}
