package com.omfg.antoday.trade.dto;

import com.omfg.antoday.trade.domain.Trade;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@ToString
public class TradeListResponseDto {
    private long tradePk;
    private int price;
    private int cnt;
    private LocalDateTime tradeAt;
    private String stockCode;
    private String corpName;
    private String logoUrl;
    private List<String> keyword;

    @Builder
    public TradeListResponseDto(long tradePk, String stockCode, String corpName, String logoUrl, LocalDateTime tradeAt, int price, int cnt, List<String> keyword) {
        this.tradePk = tradePk;
        this.stockCode = stockCode;
        this.corpName = corpName;
        this.logoUrl = logoUrl;
        this.tradeAt = tradeAt;
        this.price = price;
        this.cnt = cnt;
        this.keyword = keyword;
    }
    public static TradeListResponseDto toDto(Trade trade) {
        return TradeListResponseDto.builder()
                .tradePk(trade.getTradePk())
                .tradeAt(trade.getTradeAt())
                .price(trade.getPrice())
                .cnt(trade.getCnt())
                .corpName(trade.getStock().getCropName())
                .stockCode(trade.getStock().getStockCode())
                .build();
    }
}
