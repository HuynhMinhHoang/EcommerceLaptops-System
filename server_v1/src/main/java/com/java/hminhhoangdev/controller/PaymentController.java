package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.request.PaymentDTO;
import com.java.hminhhoangdev.dto.response.ResponseData;
import com.java.hminhhoangdev.service.OrderService;
import com.java.hminhhoangdev.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/user/payment")
//@RequiredArgsConstructor
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/vn-pay")
    public ResponseData<PaymentDTO.VNPayResponse> pay(HttpServletRequest request, @RequestParam int paymentTypeId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Success", paymentService.createVnPayPayment(request, paymentTypeId));
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error: " + e.getMessage());
        }
    }

    @GetMapping("/vn-pay-callback")
    public void payCallbackHandler(HttpServletRequest request, HttpServletResponse response) {
        try {
            String status = request.getParameter("vnp_ResponseCode");
            String txnRef = request.getParameter("vnp_TxnRef");
            String returnUrl = "http://localhost:3000/gearvn/cart/payment?step=3";

            if ("00".equals(status)) {
                int orderId = Integer.parseInt(txnRef);
                orderService.updateOrderPaymentStatus(orderId, true);
                returnUrl += "&status=success";
                response.sendRedirect(returnUrl);
            } else {
                returnUrl += "&status=failed";
                response.sendRedirect(returnUrl);
            }
            
        } catch (Exception e) {
            try {
                response.sendRedirect("http://localhost:3000/gearvn/cart/payment?step=3&status=error");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        }
    }

}

