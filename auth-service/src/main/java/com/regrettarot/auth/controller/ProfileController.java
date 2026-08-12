package com.regrettarot.auth.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.regrettarot.auth.dto.*;
import com.regrettarot.auth.entity.OnboardingAnswer;
import com.regrettarot.auth.entity.Situation;
import com.regrettarot.auth.entity.User;
import com.regrettarot.auth.repository.OnboardingAnswerRepository;
import com.regrettarot.auth.repository.SituationRepository;
import com.regrettarot.auth.repository.UserRepository;
import com.regrettarot.auth.service.JwtService;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final UserRepository users;
    private final OnboardingAnswerRepository onboarding;
    private final SituationRepository situations;
    private final JwtService jwt;

    public ProfileController(UserRepository users, OnboardingAnswerRepository onboarding, SituationRepository situations, JwtService jwt) {
        this.users = users;
        this.onboarding = onboarding;
        this.situations = situations;
        this.jwt = jwt;
    }

    @PostMapping("/onboarding")
    public void saveOnboarding(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
            @Valid @RequestBody OnboardingRequest request) {
        UUID userId = UUID.fromString(jwt.verify(bearer(authorization)).getSubject());
        User user = users.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Map<String, Integer> responses = request.responses();
        if (responses == null || responses.isEmpty()) return;

        // Validate inputs: question text non-blank, answers 1..5
        for (Map.Entry<String, Integer> e : responses.entrySet()) {
            String q = e.getKey();
            Integer v = e.getValue();
            if (q == null || q.isBlank() || v == null || v < 1 || v > 5) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid onboarding responses");
            }
        }

        // Load existing answers for this user to perform upsert (replace existing answers)
        List<OnboardingAnswer> existing = onboarding.findByUser(user);
        Map<String, OnboardingAnswer> existingMap = existing.stream()
                .collect(Collectors.toMap(OnboardingAnswer::getQuestionText, a -> a));

        List<OnboardingAnswer> toSave = new ArrayList<>();
        responses.forEach((q, v) -> {
            OnboardingAnswer ex = existingMap.get(q);
            if (ex != null) {
                ex.setAnswer(v);
                toSave.add(ex);
            } else {
                toSave.add(new OnboardingAnswer(user, q, v));
            }
        });

        onboarding.saveAll(toSave);
    }

    @GetMapping("/onboarding")
    public Map<String, Integer> getOnboarding(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        UUID userId = UUID.fromString(jwt.verify(bearer(authorization)).getSubject());
        User user = users.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        List<OnboardingAnswer> list = onboarding.findByUser(user);
        return list.stream().collect(Collectors.toMap(OnboardingAnswer::getQuestionText, OnboardingAnswer::getAnswer));
    }

    @PostMapping("/situation")
    public CurrentSituationResponse saveSituation(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
            @Valid @RequestBody CurrentSituationRequest request) {
        UUID userId = UUID.fromString(jwt.verify(bearer(authorization)).getSubject());
        User user = users.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Situation s = new Situation(user, request.currentSituation(), request.currentFeeling());
        Situation saved = situations.save(s);
        return new CurrentSituationResponse(saved.getCurrentSituation(), saved.getCurrentFeeling(), saved.getCreatedAt());
    }

    @GetMapping("/situation")
    public CurrentSituationResponse getLatestSituation(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        UUID userId = UUID.fromString(jwt.verify(bearer(authorization)).getSubject());
        User user = users.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Situation s = situations.findTopByUserOrderByCreatedAtDesc(user).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No situation found"));
        return new CurrentSituationResponse(s.getCurrentSituation(), s.getCurrentFeeling(), s.getCreatedAt());
    }

    private String bearer(String value) {
        if (value == null || !value.startsWith("Bearer "))
            throw new IllegalArgumentException("Bearer token required");
        return value.substring(7);
    }
}
