package com.regrettarot.auth.dto;

import jakarta.validation.constraints.NotNull;
import java.util.Map;

public record OnboardingRequest(@NotNull Map<String, Integer> responses) {
}
