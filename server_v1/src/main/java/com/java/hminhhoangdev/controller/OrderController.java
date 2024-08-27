package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.model.Order;
import com.java.hminhhoangdev.service.OrderService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;


    @GetMapping
    public List<Order> getOrdersByAccountId(@RequestParam int idAccount) {
        return orderService.getOrdersByAccountId(idAccount);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Order>> searchOrders(@RequestParam int accountId, @RequestParam long idOrder) throws BadRequestException {
        try {
            List<Order> orders = orderService.searchOrders(accountId, idOrder);
            return ResponseEntity.ok(orders);
        } catch (NumberFormatException e) {
            throw new BadRequestException("Mã đơn hàng quá dài hoặc không hợp lệ");
        }
    }

}
