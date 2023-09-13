package com.omfg.antoday.trade.dto;

import com.omfg.antoday.trade.domain.Trade;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ToString
@Getter
public class TradeDetailResponseDto {
    private long tradePk;
    private int price;
    private int cnt;
    private boolean optionBuySell;
    private LocalDateTime tradeAt;
    private String stockCode;
    private String corpName;
    private String logoUrl;
    private String reason;
    private String aiAnalyze;
    private Set<String> keyword;

    @Builder
    public TradeDetailResponseDto(long tradePk, int price, int cnt, boolean optionBuySell, LocalDateTime tradeAt, String stockCode, String corpName, String logoUrl, String reason, String aiAnalyze, Set<String> keyword) {
        this.tradePk = tradePk;
        this.price = price;
        this.cnt = cnt;
        this.optionBuySell = optionBuySell;
        this.tradeAt = tradeAt;
        this.stockCode = stockCode;
        this.corpName = corpName;
        this.logoUrl = logoUrl;
        this.reason = reason;
        this.aiAnalyze = aiAnalyze;
        this.keyword = keyword;
    }

    public static TradeDetailResponseDto toDto(Trade trade) {
        return TradeDetailResponseDto.builder()
                .tradePk(trade.getTradePk())
                .tradeAt(trade.getTradeAt())
                .price(trade.getPrice())
                .cnt(trade.getCnt())
                .reason(trade.getReason())
                .aiAnalyze(trade.getAiAnalyze())
                .keyword(trade.getKeywords().stream().map(tradeKeyword -> {
                    return tradeKeyword.getKeyword().getKeyword();
                }).collect(Collectors.toSet()))
                .optionBuySell(trade.isOptionBuySell())
                .corpName(trade.getStock().getCorpName())
                .stockCode(trade.getStock().getStockCode())
                .build();
    }
}
