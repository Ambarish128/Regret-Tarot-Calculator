package com.regrettarot.regret.controller;

import com.regrettarot.regret.dto.*;
import com.regrettarot.regret.service.ReadingService;
import jakarta.validation.Valid;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReadingController {
    private final ReadingService readings;

    public ReadingController(ReadingService readings) {
        this.readings = readings;
    }

    @PostMapping("/api/regrets/analyze")
    public ChainResponse analyze(@RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody RegretAnalysisRequest request) {
        return readings.analyze(userId, request);
    }

    @PostMapping("/api/tarot/read")
    public ChainResponse tarot(@RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody TarotReadingRequest request) {
        return readings.tarot(userId, request);
    }

    @GetMapping("/api/regrets/history")
    public List<HistoryResponse> history(@RequestHeader("X-User-Id") UUID userId) {
        return readings.history(userId);
    }
}
