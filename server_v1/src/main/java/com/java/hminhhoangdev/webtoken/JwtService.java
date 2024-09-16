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

    // Tạo JWT từ UserDetails
    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails.getUsername(), ACCESS_TOKEN_EXPIRATION);
    }

    // Tạo Refresh Token từ UserDetails
    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails.getUsername(), REFRESH_TOKEN_EXPIRATION);
    }

    // Tạo JWT với tên người dùng và thời gian hết hạn
    private String generateToken(String username, long expirationTime) {
        return Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + expirationTime)).signWith(generateSecret()).compact();
    }

    // Tạo SecretKey từ khóa bí mật
    public SecretKey generateSecret() {
        byte[] decodeKey = Base64.getDecoder().decode(SECRET);
        return Keys.hmacShaKeyFor(decodeKey);
    }

    // Xác thực JWT
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Lấy tên người dùng từ JWT
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Trích xuất tất cả các claims từ JWT
    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(generateSecret()).build().parseClaimsJws(token).getBody();
    }

    // Kiểm tra xem token có hết hạn không
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
