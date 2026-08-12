package com.regrettarot.auth.repository;

import com.regrettarot.auth.entity.OnboardingAnswer;
import com.regrettarot.auth.entity.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnboardingAnswerRepository extends JpaRepository<OnboardingAnswer, UUID> {
    List<OnboardingAnswer> findByUser(User user);
    Optional<OnboardingAnswer> findByUserAndQuestionText(User user, String questionText);
}
