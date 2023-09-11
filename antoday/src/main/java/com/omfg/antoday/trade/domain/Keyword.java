package com.omfg.antoday.trade.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long keywordPk;

    private String keyword;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public Keyword(long keywordPk, String keyword, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.keywordPk = keywordPk;
        this.keyword = keyword;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
