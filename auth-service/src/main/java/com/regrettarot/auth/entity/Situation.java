package com.regrettarot.auth.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "situations")
public class Situation {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "current_situation", columnDefinition = "TEXT")
    private String currentSituation;

    @Column(name = "current_feeling", columnDefinition = "TEXT")
    private String currentFeeling;

    @Column(nullable = false)
    private Instant createdAt;

    protected Situation() {
    }

    public Situation(User user, String currentSituation, String currentFeeling) {
        this.user = user;
        this.currentSituation = currentSituation;
        this.currentFeeling = currentFeeling;
        this.createdAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getCurrentSituation() {
        return currentSituation;
    }

    public String getCurrentFeeling() {
        return currentFeeling;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
