package com.omfg.antoday.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserStockListResponseDto {
    private String stockCode;
    private String corpName;
    private String logoUrl;

    @Builder
    public UserStockListResponseDto(String stockCode, String corpName, String logoUrl) {
        this.stockCode = stockCode;
        this.corpName = corpName;
        this.logoUrl = logoUrl;
    }
}