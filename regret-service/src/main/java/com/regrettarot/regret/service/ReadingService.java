package com.regrettarot.regret.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.regrettarot.regret.dto.*;
import com.regrettarot.regret.entity.ReadingHistory;
import com.regrettarot.regret.repository.ReadingHistoryRepository;
import java.util.*;
import org.springframework.stereotype.Service;

@Service
public class ReadingService {
    private final PythonChainClient chain;
    private final ReadingHistoryRepository history;
    private final ObjectMapper mapper;

    public ReadingService(PythonChainClient chain, ReadingHistoryRepository history, ObjectMapper mapper) {
        this.chain = chain;
        this.history = history;
        this.mapper = mapper;
    }

    public ChainResponse analyze(UUID userId, RegretAnalysisRequest request) {
        return save(userId, "REGRET", request.regret(), chain.analyze(request.regret()));
    }

    public ChainResponse tarot(UUID userId, TarotReadingRequest request) {
        return save(userId, "TAROT", request.question(), chain.tarot(request.question()));
    }

    public List<HistoryResponse> history(UUID userId) {
        return history.findByUserIdOrderByCreatedAtDesc(userId).stream().map(h -> new HistoryResponse(h.getId(),
                h.getType(), h.getPrompt(), read(h.getResultJson()), h.getCreatedAt())).toList();
    }

    private ChainResponse save(UUID userId, String type, String prompt, JsonNode result) {
        ReadingHistory saved = history.save(new ReadingHistory(userId, type, prompt, result.toString()));
        return new ChainResponse(saved.getId(), type, result, saved.getCreatedAt());
    }

    private JsonNode read(String value) {
        try {
            return mapper.readTree(value);
        } catch (Exception e) {
            throw new IllegalStateException("Invalid stored chain result", e);
        }
    }
}
