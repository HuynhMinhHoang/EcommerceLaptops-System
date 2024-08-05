package com.java.hminhhoangdev.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentDTO {
    @Getter
    @Setter
    @Builder
    public static class VNPayResponse {
        private String code;
        private String message;
        private String paymentUrl;
        private int orderId;
    }
}
