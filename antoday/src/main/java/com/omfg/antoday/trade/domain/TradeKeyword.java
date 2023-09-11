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

    @ManyToOne
    @JoinColumn(name = "keword_pk")
    private Keyword keyword;

    private String stockCode;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public TradeKeyword(long tradeKeywordPk, Trade trade, Keyword keyword, String stockCode, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.tradeKeywordPk = tradeKeywordPk;
        this.trade = trade;
        this.keyword = keyword;
        this.stockCode = stockCode;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
