package com.java.hminhhoangdev.service.impl;


import com.java.hminhhoangdev.config.VNPAYConfig;
import com.java.hminhhoangdev.dto.request.PaymentRequestDTO;
import com.java.hminhhoangdev.model.Order;
import com.java.hminhhoangdev.service.OrderService;
import com.java.hminhhoangdev.service.PaymentService;
import com.java.hminhhoangdev.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final VNPAYConfig vnPayConfig;

    private final OrderService orderService;

    @Override
    public PaymentRequestDTO.VNPayResponse createVnPayPayment(HttpServletRequest request, int paymentTypeId) {
        Order order = orderService.createOrderVNPay(request, paymentTypeId);

        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();

        String txnRef = String.valueOf(order.getIdOrder());
        vnpParamsMap.put("vnp_TxnRef", txnRef);
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

        return PaymentRequestDTO.VNPayResponse.builder().code("ok").message("success").paymentUrl(paymentUrl).orderId(order.getIdOrder()).build();
    }

}
