package com.omfg.antoday.stock.dto;

import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.domain.StockInterface;
import com.omfg.antoday.trade.domain.Trade;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class StockListResponseDto{
    private String corpName;
    private String stockCode;
    private String logoUrl;
    private Boolean isLiked;

    @Builder
    public StockListResponseDto(String corpName, String stockCode, String logoUrl, Boolean isLiked) {
        this.corpName = corpName;
        this.stockCode = stockCode;
        this.logoUrl = logoUrl;
        this.isLiked = isLiked;
    }

    public static StockListResponseDto toDto(StockInterface stock) {
        boolean isLiked = stock.getIsLiked() == 1;
        return StockListResponseDto.builder()
                .stockCode(stock.getStockCode())
                .corpName(stock.getCorpName())
                .logoUrl(stock.getLogoUrl())
                .isLiked(isLiked)
                .build();
    }
}
