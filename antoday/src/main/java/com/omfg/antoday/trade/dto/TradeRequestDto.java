package com.omfg.antoday.trade.dto;

import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.trade.domain.Keyword;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.trade.domain.TradeKeyword;
import com.omfg.antoday.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class TradeRequestDto {
    private Long tradePk;
    private int cnt;
    private int price;
    private boolean optionBuySell;
    private LocalDateTime tradeAt;
    private String stockCode;
    private String reason;
    private List<String> keywords;

    @Builder
    public TradeRequestDto(Long tradePk, int cnt, int price, boolean optionBuySell, LocalDateTime tradeAt, String stockCode, String reason, List<String> keywords) {
        this.tradePk = tradePk;
        this.cnt = cnt;
        this.price = price;
        this.optionBuySell = optionBuySell;
        this.tradeAt = tradeAt;
        this.stockCode = stockCode;
        this.reason = reason;
        this.keywords = keywords;
    }


    public static Trade toTrade(TradeRequestDto dto, User user) {
        Set<TradeKeyword> keywordlist = dto.keywords.stream().map(s -> TradeKeyword.builder().keyword(Keyword.builder().keyword(s).build()).build()).collect(Collectors.toSet());
        return Trade.builder()
                .tradePk(dto.getTradePk())
                .cnt(dto.getCnt())
                .price(dto.getPrice())
                .optionBuySell(dto.isOptionBuySell())
                .tradeAt(dto.getTradeAt())
                .reason(dto.getReason())
                .user(user)
                .keywords(keywordlist)
                .stock(Stock.builder().stockCode(dto.getStockCode()).build())
                .build();
    }
}
