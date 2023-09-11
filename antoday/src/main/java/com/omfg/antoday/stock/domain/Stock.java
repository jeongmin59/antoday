package com.omfg.antoday.stock.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Stock {

    @Id
    private String stockCode;
    private String cropCode;
    private String cropName;
    private String market;
    private long stocks;
    @Column(columnDefinition = "TEXT")
    private String logo_url;

    @Builder
    public Stock(String stockCode, String cropCode, String cropName, String market, long stocks, String logo_url) {
        this.stockCode = stockCode;
        this.cropCode = cropCode;
        this.cropName = cropName;
        this.market = market;
        this.stocks = stocks;
        this.logo_url = logo_url;
    }
}
