package com.omfg.antoday.stock.domain;

import javax.persistence.Column;
import javax.persistence.Id;

public interface StockInterface {
    String getStockCode();
    String getCorpCode();
    String getCorpName();
    String getMarket();
    Long getStocks();
    String getLogo_url();
}
