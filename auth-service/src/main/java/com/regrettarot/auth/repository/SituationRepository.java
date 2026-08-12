package com.regrettarot.auth.repository;

import com.regrettarot.auth.entity.Situation;
import com.regrettarot.auth.entity.User;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SituationRepository extends JpaRepository<Situation, UUID> {
    Optional<Situation> findTopByUserOrderByCreatedAtDesc(User user);
}
