package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.model.Order;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EmailService {
    void sendOrderConfirmationEmail(String email, int orderId, String fullName, String phone, String shippingAddress, double price, List<MultipartFile> productImages);
}
