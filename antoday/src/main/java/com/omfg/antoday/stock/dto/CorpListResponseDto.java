package com.omfg.antoday.stock.dto;

import com.omfg.antoday.stock.domain.Stock;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CorpListResponseDto {
    private String stockCode;
    private String corpCode;
    private String corpName;
    private String logoUrl;
    private Boolean isLiked;

    @Builder
    public CorpListResponseDto(String stockCode, String corpCode, String corpName, String logoUrl, Boolean isLiked) {
        this.stockCode = stockCode;
        this.corpCode = corpCode;
        this.corpName = corpName;
        this.logoUrl = logoUrl;
        this.isLiked = isLiked;
    }

    public static CorpListResponseDto toEntity(Stock stock, Boolean isLiked) {
        return CorpListResponseDto.builder()
                .stockCode(stock.getStockCode())
                .corpCode(stock.getCorpCode())
                .corpName(stock.getCorpName())
                .logoUrl(stock.getLogo_url())
                .isLiked(isLiked)
                .build();
    }
}
