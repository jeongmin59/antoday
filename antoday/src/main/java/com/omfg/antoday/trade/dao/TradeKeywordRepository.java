package com.omfg.antoday.trade.dao;

import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.trade.domain.TradeKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TradeKeywordRepository extends JpaRepository<TradeKeyword,Long> {
    List<TradeKeyword> findByTrade(Trade trade);

    void deleteByTrade(Trade t);
}
