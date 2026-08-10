package com.regrettarot.regret.dto;

import com.fasterxml.jackson.databind.JsonNode;
import java.time.Instant;
import java.util.UUID;

public record HistoryResponse(UUID id, String type, String prompt, JsonNode result, Instant createdAt) {
}
