package com.regrettarot.gateway.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getSigningKey() {
        // Forces raw UTF-8 encoding to perfectly match Auth0 HMAC256 from the Auth Service
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Claims validateAndExtractClaims(String token) {
        return Jwts.parserBuilder()             // 1. Use parserBuilder() instead of parser()
            .setSigningKey(getSigningKey()) // 2. Use setSigningKey() instead of verifyWith()
            .build()
            .parseClaimsJws(token)          // 3. Use parseClaimsJws() instead of parseSignedClaims()
            .getBody();                     // 4. Use getBody() instead of getPayload()
    }
}
