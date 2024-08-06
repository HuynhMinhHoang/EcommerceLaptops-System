package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user/")
public class OrderController {
    @Autowired
    private OrderService orderService;


}
