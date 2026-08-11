package com.regrettarot.regret.service;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class PythonChainClient {
    private final RestClient client;

    public PythonChainClient(RestClient.Builder builder, @Value("${chain-service.base-url}") String baseUrl) {
        this.client = builder.baseUrl(baseUrl).build();
    }

    public JsonNode analyze(String regret) {
        return invoke("/run_regret_chain", Map.of("regret", regret));
    }

    public JsonNode tarot(String question) {
        return invoke("/run_tarot_chain", Map.of("question", question));
    }

    private JsonNode invoke(String path, Map<String, String> body) {
        return client.post().uri(path).body(body).retrieve().body(JsonNode.class);
    }
}
