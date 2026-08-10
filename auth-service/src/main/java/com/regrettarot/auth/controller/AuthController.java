package com.regrettarot.auth.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.regrettarot.auth.dto.*;
import com.regrettarot.auth.service.AuthService;
import com.regrettarot.auth.service.JwtService;
import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService auth;
    private final JwtService jwt;

    public AuthController(AuthService auth, JwtService jwt) {
        this.auth = auth;
        this.jwt = jwt;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return auth.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return auth.login(request);
    }

    @GetMapping("/me")
    public MeResponse me(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        DecodedJWT token = jwt.verify(bearer(authorization));
        return auth.me(UUID.fromString(token.getSubject()));
    }

    private String bearer(String value) {
        if (value == null || !value.startsWith("Bearer "))
            throw new IllegalArgumentException("Bearer token required");
        return value.substring(7);
    }
}
