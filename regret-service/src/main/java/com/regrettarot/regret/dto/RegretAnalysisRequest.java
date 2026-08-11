package com.regrettarot.regret.dto;

import jakarta.validation.constraints.NotBlank;

public record RegretAnalysisRequest(@NotBlank String regret) {
}
