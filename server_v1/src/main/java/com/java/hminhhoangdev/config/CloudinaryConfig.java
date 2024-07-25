package com.java.hminhhoangdev.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        final Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "du7peunju");
        config.put("api_key", "976694131832242");
        config.put("api_secret", "nG_vQjqVYl8daQOedu4UlYa5nds");
        return new Cloudinary(config);
    }
}
