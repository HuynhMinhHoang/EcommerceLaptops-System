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
        config.put("cloud_name", "diyeuzxqt");
        config.put("api_key", "599941136112728");
        config.put("api_secret", "FK5DmkFmGOJev3sTfwLLOnPI4tw");
        return new Cloudinary(config);
    }
}
