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

    @Builder
    public StockListResponseDto(String corpName, String stockCode, String logoUrl) {
        this.corpName = corpName;
        this.stockCode = stockCode;
        this.logoUrl = logoUrl;
    }
//    public static StockListResponseDto toDto(Trade trade) {
//        Stock stock = trade.getStock();
//        return StockListResponseDto.builder()
//                .stockCode(stock.getStockCode())
//                .corpName(stock.getCorpName())
//                .logo_url(stock.getLogo_url())
//                .build();
//    }
//    public static StockListResponseDto toDto(Stock stock) {
//        return StockListResponseDto.builder()
//                .stockCode(stock.getStockCode())
//                .corpName(stock.getCorpName())
//                .logo_url(stock.getLogo_url())
//                .build();
//    }
//
    public static StockListResponseDto toDto(StockInterface stock) {
        return StockListResponseDto.builder()
                .stockCode(stock.getStockCode())
                .corpName(stock.getCorpName())
                .logoUrl(stock.getLogoUrl())
                .build();
    }
}
