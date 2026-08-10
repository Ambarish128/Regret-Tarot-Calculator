package com.regrettarot.regret.dto;

import jakarta.validation.constraints.NotBlank;

public record TarotReadingRequest(@NotBlank String question) {
}
