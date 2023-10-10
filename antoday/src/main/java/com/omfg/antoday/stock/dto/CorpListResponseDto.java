package com.omfg.antoday.stock.dto;

import com.omfg.antoday.stock.domain.Stock;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CorpListResponseDto {
    private String stockCode;
    private String corpName;
    private String market;
    private String logoUrl;
    private Boolean isLiked;

    @Builder
    public CorpListResponseDto(String stockCode, String corpName, String market, String logoUrl, Boolean isLiked) {
        this.stockCode = stockCode;
        this.corpName = corpName;
        this.market = market;
        this.logoUrl = logoUrl;
        this.isLiked = isLiked;
    }

    public static CorpListResponseDto toEntity(Stock stock, Boolean isLiked) {
        return CorpListResponseDto.builder()
                .stockCode(stock.getStockCode())
                .corpName(stock.getCorpName())
                .market(stock.getMarket())
                .logoUrl(stock.getLogo_url())
                .isLiked(isLiked)
                .build();
    }
}
