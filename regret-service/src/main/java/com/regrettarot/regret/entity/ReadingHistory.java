package com.regrettarot.regret.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
public class ReadingHistory {
    @Id
    @GeneratedValue
    private UUID id;
    @Column(nullable = false)
    private UUID userId;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false, length = 4000)
    private String prompt;
    @Lob
    @Column(nullable = false)
    private String resultJson;
    @Column(nullable = false)
    private Instant createdAt;

    protected ReadingHistory() {
    }

    public ReadingHistory(UUID userId, String type, String prompt, String resultJson) {
        this.userId = userId;
        this.type = type;
        this.prompt = prompt;
        this.resultJson = resultJson;
        this.createdAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getType() {
        return type;
    }

    public String getPrompt() {
        return prompt;
    }

    public String getResultJson() {
        return resultJson;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
