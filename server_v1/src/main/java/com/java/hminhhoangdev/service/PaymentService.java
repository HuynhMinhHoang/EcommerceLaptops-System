package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.dto.request.PaymentRequestDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface PaymentService {
    PaymentRequestDTO.VNPayResponse createVnPayPayment(HttpServletRequest request, int paymentTypeId);
}
