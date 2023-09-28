package com.omfg.antoday.trade.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class StockRoiResponseDto {
    String stockCode;
    String corpName;
    int cnt;
    int avgPrice;
    int profit;
    double roi;

    @Builder

    public StockRoiResponseDto(String stockCode, String corpName, int cnt, int avgPrice, int profit, double roi) {
        this.stockCode = stockCode;
        this.corpName = corpName;
        this.cnt = cnt;
        this.avgPrice = avgPrice;
        this.profit = profit;
        this.roi = roi;
    }
}
