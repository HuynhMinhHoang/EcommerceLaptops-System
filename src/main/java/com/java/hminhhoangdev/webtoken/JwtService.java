//package com.java.hminhhoangdev.webtoken;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.SecretKey;
//import java.util.Base64;
//import java.util.Date;
//
//@Service
//public class JwtService {
//
//    private static final String SECRET = "yzX9BYmRbdtNVftXHHxiSfOfFnO9CNUijNyaklgFtkxXyos+Auso/ves64GKxtb4A7GHRc3OTl3wRjFMGvOq6A==";
//    private static final long TIME = 1800000; // 30 minutes
//
//    public String generateToken(UserDetails userDetails) {
//        return Jwts.builder()
//                .setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + TIME))
//                .signWith(generateSecret())
//                .compact();
//    }
//
//    public SecretKey generateSecret() {
//        byte[] decodeKey = Base64.getDecoder().decode(SECRET);
//        return Keys.hmacShaKeyFor(decodeKey);
//    }
//
//    public boolean validateToken(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//
//    public String extractUsername(String token) {
//        return extractAllClaims(token).getSubject();
//    }
//
//    private Claims extractAllClaims(String token) {
//        return Jwts.parserBuilder().setSigningKey(generateSecret()).build().parseClaimsJws(token).getBody();
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractAllClaims(token).getExpiration().before(new Date());
//    }
//}

// JwtService.java
package com.java.hminhhoangdev.webtoken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET = "yzX9BYmRbdtNVftXHHxiSfOfFnO9CNUijNyaklgFtkxXyos+Auso/ves64GKxtb4A7GHRc3OTl3wRjFMGvOq6A==";
    private static final long ACCESS_TOKEN_EXPIRATION = 5 * 24 * 60 * 60 * 1000; // 5 days
    private static final long REFRESH_TOKEN_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 days

    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails.getUsername(), ACCESS_TOKEN_EXPIRATION);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails.getUsername(), REFRESH_TOKEN_EXPIRATION);
    }

    private String generateToken(String username, long expirationTime) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(generateSecret())
                .compact();
    }

    public SecretKey generateSecret() {
        byte[] decodeKey = Base64.getDecoder().decode(SECRET);
        return Keys.hmacShaKeyFor(decodeKey);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(generateSecret()).build().parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
