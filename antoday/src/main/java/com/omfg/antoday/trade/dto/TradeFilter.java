package com.omfg.antoday.trade.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public enum TradeFilter {

    @JsonProperty("buy")
    BUY,

    @JsonProperty("sell")
    SELL,

    @JsonProperty("unwritten")
    UNWRITTEN,

    @JsonProperty("default")
    DEFAULT;

    @JsonCreator
    public static TradeFilter fromString(String key) {
        for(TradeFilter type : TradeFilter.values()) {
            if(type.name().equalsIgnoreCase(key)) {
                return type;
            }
        }
        return null;
    }
}
