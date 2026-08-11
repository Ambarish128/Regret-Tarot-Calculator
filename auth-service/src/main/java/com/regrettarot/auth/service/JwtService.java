package com.regrettarot.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final Algorithm algorithm;

    public JwtService(@Value("${app.jwt.secret}") String secret) {
        this.algorithm = Algorithm.HMAC256(secret);
    }

    public String issue(UserPrincipal user) {
        return JWT.create().withSubject(user.id().toString()).withClaim("email", user.email())
                .withExpiresAt(Date.from(Instant.now().plusSeconds(86400))).sign(algorithm);
    }

    public DecodedJWT verify(String token) {
        return JWT.require(algorithm).build().verify(token);
    }

    public record UserPrincipal(UUID id, String email) {
    }
}
