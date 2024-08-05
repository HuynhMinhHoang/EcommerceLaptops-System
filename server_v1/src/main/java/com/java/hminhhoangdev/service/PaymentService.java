package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.dto.request.PaymentDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface PaymentService {
    PaymentDTO.VNPayResponse createVnPayPayment(HttpServletRequest request, int paymentTypeId);
}
