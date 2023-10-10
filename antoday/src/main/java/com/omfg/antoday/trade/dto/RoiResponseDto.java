package com.omfg.antoday.trade.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class RoiResponseDto {
    String stockCode;
    String corpName;
    String logoUrl;
    int totalProfit;
    double avgRoi;

    @Builder
    public RoiResponseDto(String stockCode, String corpName, String logoUrl, int totalProfit, double avgRoi) {
        this.stockCode = stockCode;
        this.corpName = corpName;
        this.logoUrl = logoUrl;
        this.totalProfit = totalProfit;
        this.avgRoi = avgRoi;
    }
}
