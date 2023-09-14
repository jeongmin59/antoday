package com.omfg.antoday.trade.dao;

import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.domain.StockInterface;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Set;

public interface TradeRepository extends JpaRepository<Trade,Long> {

    @Modifying
    @Query("UPDATE Trade SET isDeleted = true WHERE tradePk = :tradePk")
    int deleteByTradePk(long tradePk);

    Trade findByTradePk(Long tradePk);

    Page<Trade> findByUserAndIsDeletedFalse(User u, PageRequest pageRequest);

    Page<Trade> findByUserAndStockAndIsDeletedFalse(User user, Stock stock, PageRequest pageRequest);

    Page<Trade> findByUserAndTradeAtBetweenAndIsDeletedFalse(User user, LocalDateTime start, LocalDateTime end, PageRequest pageRequest);
    
    Page<Trade> findByUserAndStockAndTradeAtBetweenAndIsDeletedFalse(User user, Stock stock, LocalDateTime start, LocalDateTime end, PageRequest pageRequest);

    @Query(value = "select distinct t.stock_code stockCode, s.corp_name corpName\n" +
            "from trade t, user u, stock s\n" +
            "where t.social_id = u.social_id\n" +
            "and t.stock_code = s.stock_code\n" +
            "and t.social_id = (:userPk);"
            , nativeQuery = true)
    Set<StockInterface> findDistintStockByUser(@Param("userPk") Long user);
}
