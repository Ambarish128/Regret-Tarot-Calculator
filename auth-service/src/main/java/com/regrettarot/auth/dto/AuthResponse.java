package com.regrettarot.auth.dto;

import java.util.UUID;

public record AuthResponse(String accessToken, UUID userId, String email, String displayName) {
}
