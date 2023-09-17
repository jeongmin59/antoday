package com.omfg.antoday.stock.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StockPriceResponseDto {
    private String status;
    private String stockCode;
    private int price;
    private int totalCnt;
}
