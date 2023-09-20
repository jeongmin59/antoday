package com.omfg.antoday.stock.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StockPriceListResponseDto {
    private String stockCode;
    private String corpName;
    private String logoUrl;
    private int lastBuyPrice;
    private int netCount;
}