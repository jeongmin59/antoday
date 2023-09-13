package com.omfg.antoday.trade.dao;

import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TradeRepository extends JpaRepository<Trade,Long> {

    @Modifying
    @Query("UPDATE Trade SET isDeleted = true WHERE tradePk = :tradePk")
    int deleteByTradePk(long tradePk);

//    @Query("SELECT t.tradePk, t.cnt, t.price, t.tradeAt, t.stock.cropName, t.stock.logo_url, t.stock.market \n" +
//            "FROM Trade t \n" +
//            "WHERE t.isDeleted = false \n" +
//            "AND t.user = :u")
    Page<Trade> findByUserAndIsDeletedFalse(User u, PageRequest pageRequest);

    Trade findByTradePk(Long tradePk);
//
//    Page<Trade> findBySocialIdAndStockCode(String socialId, String stockCode, PageRequest pageRequest);
//
//    Page<Trade> findBySocialIdAndTradeAtGreaterThanAndTradeAtLessThan(String socialId, String start, String end, PageRequest pageRequest);
//
//    Page<Trade> findBySocialIdAndStockCodeAndTradeAtGreaterThanAndTradeAtLessThan(String socialId, String stockCode, String start, String end, PageRequest pageRequest);
}
