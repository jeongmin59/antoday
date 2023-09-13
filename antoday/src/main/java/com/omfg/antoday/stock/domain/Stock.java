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
    private String corpCode;
    private String corpName;
    private String market;
    private Long stocks;
    @Column(columnDefinition = "TEXT")
    private String logo_url;

    @Builder
    public Stock(String stockCode, String corpCode, String corpName, String market, Long stocks, String logo_url) {
        this.stockCode = stockCode;
        this.corpCode = corpCode;
        this.corpName = corpName;
        this.market = market;
        this.stocks = stocks;
        this.logo_url = logo_url;
    }
}
