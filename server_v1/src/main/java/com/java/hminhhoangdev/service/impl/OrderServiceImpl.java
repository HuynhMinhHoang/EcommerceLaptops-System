package com.java.hminhhoangdev.service.impl;

import com.java.hminhhoangdev.dto.request.OrderRequestDTO;
import com.java.hminhhoangdev.model.Order;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.model.OrderDetail;
import com.java.hminhhoangdev.model.PaymentType;
import com.java.hminhhoangdev.repository.OrderDetailRepository;
import com.java.hminhhoangdev.repository.OrderRepository;
import com.java.hminhhoangdev.repository.AccountRepository;
import com.java.hminhhoangdev.repository.PaymentTypeRepository;
import com.java.hminhhoangdev.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PaymentTypeRepository paymentTypeRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public Order createOrderVNPay(HttpServletRequest request, int paymentTypeId) {
        Order order = new Order();
        order.setTotal_amount(Double.parseDouble(request.getParameter("total_amount")));
        order.setShippingAddress(request.getParameter("shippingAddress"));
        order.setNote(request.getParameter("note"));
        order.setCreated_at(new Date());
        order.setStatus_pay(false);
        order.setStatus_order(false);

        PaymentType paymentType = paymentTypeRepository.findById(paymentTypeId).orElseThrow(() -> new RuntimeException("Payment type not found"));

        order.setPaymentType(paymentType);

        int accountId = Integer.parseInt(request.getParameter("accountId"));
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Account not found"));
        order.setAccount(account);

        return orderRepository.save(order);
    }

    @Override
    public Order createOrderCOD(OrderRequestDTO request) {
        Order order = new Order();
        Account account = accountRepository.findById(request.getAccountId()).orElseThrow(() -> new RuntimeException("Account not found"));
        order.setAccount(account);
        order.setTotal_amount(request.getTotal_amount());
        order.setShippingAddress(request.getShippingAddress());
        order.setNote(request.getNote());
        order.setCreated_at(new Date());
        order.setStatus_pay(true);
        order.setStatus_order(false);
        PaymentType paymentType = paymentTypeRepository.findById(request.getPaymentTypeId()).orElseThrow(() -> new RuntimeException("Payment type not found"));
        order.setPaymentType(paymentType);

        return orderRepository.save(order);
    }


    @Override
    public void updateOrderPaymentStatus(int orderId, boolean status_pay) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus_pay(status_pay);
        orderRepository.save(order);
    }


    @Override
    public List<Order> getOrdersByAccountId(int accountId) {
        return orderRepository.findByAccount_IdAccount(accountId);
    }


}
