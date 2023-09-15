package com.omfg.antoday.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserStockListResponseDto {
    private String stockCode;
    private String corpCode;
    private String logoUrl;

    @Builder
    public UserStockListResponseDto(String stockCode, String corpCode, String logoUrl) {
        this.stockCode = stockCode;
        this.corpCode = corpCode;
        this.logoUrl = logoUrl;
    }
}