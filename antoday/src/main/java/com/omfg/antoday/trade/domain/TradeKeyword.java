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
public class TradeKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long tradeKeywordPk;

    @ManyToOne
    @JoinColumn(name = "trade_pk")
    private Trade trade;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "keyword")
    private Keyword keyword;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public TradeKeyword(long tradeKeywordPk, Trade trade, Keyword keyword, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.tradeKeywordPk = tradeKeywordPk;
        this.trade = trade;
        this.keyword = keyword;
         this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
