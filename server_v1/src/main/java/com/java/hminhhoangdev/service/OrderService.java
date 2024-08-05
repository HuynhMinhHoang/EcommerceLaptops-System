package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.model.Order;
import jakarta.servlet.http.HttpServletRequest;

public interface OrderService {
    Order createOrder(HttpServletRequest request, int paymentTypeId);

    void updateOrderPaymentStatus(int orderId, boolean status_pay);
}
