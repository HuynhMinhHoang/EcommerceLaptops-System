package com.java.ecommerce_system;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
public class EcommerceSystemApplication {

    private static final Logger logger = LoggerFactory.getLogger(EcommerceSystemApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(EcommerceSystemApplication.class, args);
        logger.info("Ứng dụng đã khởi động và kết nối thành công với cơ sở dữ liệu.");
    }

}
