package com.omfg.antoday.trade.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Keyword {

    @Id
    private String keyword;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public Keyword(String keyword, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.keyword = keyword;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
