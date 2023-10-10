package com.omfg.antoday.trade.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TradeListResponseDto  {
    private Long tradePk;
    private int price;
    private int cnt;
    private byte optionBuySell;
    private LocalDateTime tradeAt;
    private String stockCode;
    private String corpName;
    private String logoUrl;
    private boolean isKeywordExist;


    @Builder
    public TradeListResponseDto(Long tradePk, int price, int cnt, byte optionBuySell, LocalDateTime tradeAt, String stockCode, String corpName, String logoUrl, boolean isKeywordExist) {
        this.tradePk = tradePk;
        this.price = price;
        this.cnt = cnt;
        this.optionBuySell = optionBuySell;
        this.tradeAt = tradeAt;
        this.stockCode = stockCode;
        this.corpName = corpName;
        this.logoUrl = logoUrl;
        this.isKeywordExist = isKeywordExist;
    }

    public static TradeListResponseDto toDto(TradeListResponseInterface trade) {
        boolean isKeywordExist = trade.getIsKeywordExist() == 1;
        return TradeListResponseDto.builder()
                .tradePk(trade.getTradePk())
                .tradeAt(trade.getTradeAt())
                .price(trade.getPrice())
                .cnt(trade.getCnt())
                .optionBuySell(trade.getOptionBuySell())
                .corpName(trade.getCorpName())
                .stockCode(trade.getStockCode())
                .logoUrl(trade.getLogoUrl())
                .isKeywordExist(isKeywordExist)
                .build();
    }
}
