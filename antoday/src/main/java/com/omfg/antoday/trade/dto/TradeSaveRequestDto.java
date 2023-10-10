package com.omfg.antoday.trade.dto;

import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@NoArgsConstructor
@Getter
public class TradeSaveRequestDto {
    private int cnt;
    private int price;
    private byte optionBuySell;
    private LocalDateTime tradeAt;
    private String stockCode;
    private String reason;
    private HashSet<String> keywords;

    @Builder
    public TradeSaveRequestDto(int cnt, int price, byte optionBuySell, LocalDateTime tradeAt, String stockCode, String reason, HashSet<String> keywords) {
        this.cnt = cnt;
        this.price = price;
        this.optionBuySell = optionBuySell;
        this.tradeAt = tradeAt;
        this.stockCode = stockCode;
        this.reason = reason;
        this.keywords = keywords;
    }

    public static Trade toTrade(TradeSaveRequestDto dto, User user) {
        return Trade.builder()
                .cnt(dto.getCnt())
                .price(dto.getPrice())
                .optionBuySell(dto.getOptionBuySell())
                .tradeAt(dto.getTradeAt())
                .reason(dto.getReason())
                .user(user)
                .stock(Stock.builder().stockCode(dto.getStockCode()).build())
                .build();
    }
}
