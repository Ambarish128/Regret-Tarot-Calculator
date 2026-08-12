package com.regrettarot.auth.dto;

import java.time.Instant;

public record CurrentSituationResponse(String currentSituation, String currentFeeling, Instant createdAt) {
}
