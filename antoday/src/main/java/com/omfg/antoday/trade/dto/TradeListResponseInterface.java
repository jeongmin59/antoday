package com.omfg.antoday.trade.dto;

import java.time.LocalDateTime;

public interface TradeListResponseInterface {

    long getTradePk();
    int getPrice();
    int getCnt();
    boolean isOptionBuySell();
    LocalDateTime getTradeAt();
    String getStockCode();
    String getCorpName();
    String getLogoUrl();
}
