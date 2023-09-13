package com.omfg.antoday.trade.dto;

import com.omfg.antoday.trade.domain.Trade;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TradeListResponseDto {
    private long tradePk;
    private int price;
    private int cnt;
    private boolean optionBuySell;
    private LocalDateTime tradeAt;
    private String stockCode;
    private String corpName;
    private String logoUrl;

    @Builder
    public TradeListResponseDto(long tradePk, int price, int cnt, boolean optionBuySell, LocalDateTime tradeAt, String stockCode, String corpName, String logoUrl) {
        this.tradePk = tradePk;
        this.price = price;
        this.cnt = cnt;
        this.optionBuySell = optionBuySell;
        this.tradeAt = tradeAt;
        this.stockCode = stockCode;
        this.corpName = corpName;
        this.logoUrl = logoUrl;
    }


    public static TradeListResponseDto toDto(Trade trade) {
        return TradeListResponseDto.builder()
                .tradePk(trade.getTradePk())
                .tradeAt(trade.getTradeAt())
                .price(trade.getPrice())
                .cnt(trade.getCnt())
                .optionBuySell(trade.isOptionBuySell())
                .corpName(trade.getStock().getCorpName())
                .stockCode(trade.getStock().getStockCode())
                .build();
    }
}
