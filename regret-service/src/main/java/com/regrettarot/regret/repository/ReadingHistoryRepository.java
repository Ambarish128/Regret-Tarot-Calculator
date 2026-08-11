package com.regrettarot.regret.repository;

import com.regrettarot.regret.entity.ReadingHistory;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingHistoryRepository extends JpaRepository<ReadingHistory, UUID> {
    List<ReadingHistory> findByUserIdOrderByCreatedAtDesc(UUID userId);
}
