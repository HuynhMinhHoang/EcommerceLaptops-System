package com.java.ecommerce_system.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @GetMapping("/home")
    public String handleWelcome() {
        return "This is ss/home";
    }

    @GetMapping("/admin/home")
    public String handleAdminHome() {
        return "This is /admin/home";
    }

    @GetMapping("/user/home")
    public String handleUserHome() {
        return "This is /user/home";
    }
}
