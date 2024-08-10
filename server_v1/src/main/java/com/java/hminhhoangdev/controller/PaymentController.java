package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.request.OrderRequestDTO;
import com.java.hminhhoangdev.dto.request.PaymentRequestDTO;
import com.java.hminhhoangdev.dto.response.ResponseData;
import com.java.hminhhoangdev.model.Order;
import com.java.hminhhoangdev.service.EmailService;
import com.java.hminhhoangdev.service.OrderDetailService;
import com.java.hminhhoangdev.service.OrderService;
import com.java.hminhhoangdev.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
//@RequiredArgsConstructor
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/payment/vn-pay")
    public ResponseData<PaymentRequestDTO.VNPayResponse> pay(HttpServletRequest request, @RequestParam int paymentTypeId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Success", paymentService.createVnPayPayment(request, paymentTypeId));
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error: " + e.getMessage());
        }
    }

    @GetMapping("/payment/vn-pay-callback")
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


    @PostMapping("/payment/cod")
    public ResponseEntity<Map<String, Object>> cod(@RequestBody OrderRequestDTO request) {
        Map<String, Object> response = new HashMap<>();
        try {
            int orderId = orderService.createOrderCOD(request).getIdOrder();
            response.put("orderId", orderId);
            response.put("status", "success");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("status", "failed");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/payment/order-detail")
    public ResponseData<String> createOrderDetail(@RequestParam int orderId, @RequestParam int productId, @RequestParam int quantity) {
        try {
            orderDetailService.createOrderDetail(orderId, productId, quantity);
            return new ResponseData<>(HttpStatus.OK.value(), "OrderDetail created successfully");
        } catch (RuntimeException e) {
            return new ResponseData<>(HttpStatus.BAD_REQUEST.value(), "Error: " + e.getMessage());
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error: An unexpected error occurred: " + e.getMessage());
        }
    }

    @PostMapping(value = "/send-email", consumes = "multipart/form-data")
    public ResponseEntity<String> sendOrderConfirmationEmail(@RequestParam("email") String email,
                                                             @RequestParam("orderId") int orderId,
                                                             @RequestParam("fullName") String fullName,
                                                             @RequestParam("phone") String phone,
                                                             @RequestParam("shippingAddress") String shippingAddress,
                                                             @RequestParam("price") double price,
                                                             @RequestParam("productImages") List<MultipartFile> productImages) {
        try {
            System.out.println("Sendmail");
            emailService.sendOrderConfirmationEmail(email, orderId, fullName, phone, shippingAddress, price, productImages);
            return new ResponseEntity<>("Email sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to send email: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}

