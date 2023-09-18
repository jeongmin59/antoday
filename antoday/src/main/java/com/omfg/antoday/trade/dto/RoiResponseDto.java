package com.omfg.antoday.trade.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class RoiResponseDto {
    int totalProfit;
    double avgRoi;

    @Builder
    public RoiResponseDto(int totalProfit, double avgRoi) {
        this.totalProfit = totalProfit;
        this.avgRoi = avgRoi;
    }
}
