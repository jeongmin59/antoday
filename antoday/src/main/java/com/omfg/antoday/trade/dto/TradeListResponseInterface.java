package com.omfg.antoday.trade.dto;

import java.time.LocalDateTime;

public interface TradeListResponseInterface {

    Long getTradePk();
    int getPrice();
    int getCnt();
    byte getOptionBuySell();
    LocalDateTime getTradeAt();
    String getStockCode();
    String getCorpName();
    String getLogoUrl();
    byte getIsKeywordExist();

}
