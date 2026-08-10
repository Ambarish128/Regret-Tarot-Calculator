package com.regrettarot.regret.dto;

import com.fasterxml.jackson.databind.JsonNode;
import java.time.Instant;
import java.util.UUID;

public record ChainResponse(UUID historyId, String type, JsonNode result, Instant createdAt) {
}
