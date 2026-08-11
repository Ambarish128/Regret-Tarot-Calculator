package com.regrettarot.auth.service;

import com.regrettarot.auth.dto.*;
import com.regrettarot.auth.entity.User;
import com.regrettarot.auth.repository.UserRepository;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public AuthResponse register(RegisterRequest request) {
        if (users.findByEmail(request.email()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        return response(
                users.save(new User(request.email(), encoder.encode(request.password()), request.displayName())));
    }

    public AuthResponse login(LoginRequest request) {
        User user = users.findByEmail(request.email())
                .filter(u -> encoder.matches(request.password(), u.getPasswordHash()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        return response(user);
    }

    public MeResponse me(UUID id) {
        User user = users.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return new MeResponse(user.getId(), user.getEmail(), user.getDisplayName());
    }

    private AuthResponse response(User user) {
        return new AuthResponse(jwt.issue(new JwtService.UserPrincipal(user.getId(), user.getEmail())), user.getId(),
                user.getEmail(), user.getDisplayName());
    }
}
