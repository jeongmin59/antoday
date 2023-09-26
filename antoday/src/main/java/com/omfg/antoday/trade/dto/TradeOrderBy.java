package com.omfg.antoday.trade.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public enum TradeOrderBy {

    @JsonProperty("latest")
    LATEST,

    @JsonProperty("oldest")
    OLDEST;

    @JsonCreator
    public static TradeOrderBy fromString(String key) {
        for(TradeOrderBy type : TradeOrderBy.values()) {
            if(type.name().equalsIgnoreCase(key)) {
                return type;
            }
        }
        return null;
    }
}
