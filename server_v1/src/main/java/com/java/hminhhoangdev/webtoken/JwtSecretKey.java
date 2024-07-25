package com.java.hminhhoangdev.webtoken;

import java.security.SecureRandom;
import java.util.Base64;

public class JwtSecretKey {

    public void generatorSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[64]; // 512 bits
        secureRandom.nextBytes(key);
        String secretKey = Base64.getEncoder().encodeToString(key);
        System.out.println("========Generated Secret Key: " + secretKey);
    }

//    public static void main(String[] args) {
//        JwtSecretKey jwtSecretKey = new JwtSecretKey();
//        jwtSecretKey.generatorSecretKey();
//    }
}