package com.regrettarot.auth.dto;

import java.util.UUID;

public record MeResponse(UUID id, String email, String displayName) {
}
