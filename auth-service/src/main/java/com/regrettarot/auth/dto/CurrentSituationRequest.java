package com.regrettarot.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record CurrentSituationRequest(@NotBlank String currentSituation, @NotBlank String currentFeeling) {
}
