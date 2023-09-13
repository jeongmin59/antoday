package com.omfg.antoday.trade.dao;

import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface TradeRepository extends JpaRepository<Trade,Long> {

    @Modifying
    @Query("UPDATE Trade SET isDeleted = true WHERE tradePk = :tradePk")
    int deleteByTradePk(long tradePk);

    Trade findByTradePk(Long tradePk);

    Page<Trade> findByUserAndIsDeletedFalse(User u, PageRequest pageRequest);

    Page<Trade> findByUserAndStockAndIsDeletedFalse(User user, Stock stock, PageRequest pageRequest);

    Page<Trade> findByUserAndTradeAtBetweenAndIsDeletedFalse(User user, LocalDateTime start, LocalDateTime end, PageRequest pageRequest);
    
    Page<Trade> findByUserAndStockAndTradeAtBetweenAndIsDeletedFalse(User user, Stock stock, LocalDateTime start, LocalDateTime end, PageRequest pageRequest);

}
