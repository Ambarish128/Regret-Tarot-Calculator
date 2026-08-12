package com.regrettarot.auth.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "onboarding_answers", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "question_text"}))
public class OnboardingAnswer {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "question_text", nullable = false)
    private String questionText;

    @Column(nullable = false)
    private int answer;

    protected OnboardingAnswer() {
    }

    public OnboardingAnswer(User user, String questionText, int answer) {
        this.user = user;
        this.questionText = questionText;
        this.answer = answer;
    }

    public UUID getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getQuestionText() {
        return questionText;
    }

    public int getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
        this.answer = answer;
    }
}
