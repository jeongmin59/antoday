package com.omfg.antoday.trade.dao;

import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.domain.StockInterface;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.trade.dto.RoiResponseDto;
import com.omfg.antoday.trade.dto.TradeListResponseInterface;
import com.omfg.antoday.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public interface TradeRepository extends JpaRepository<Trade,Long> {

    @Modifying
    @Query("UPDATE Trade SET isDeleted = true WHERE tradePk = :tradePk")
    int deleteByTradePk(long tradePk);

    Trade findByTradePk(Long tradePk);

    @Query(value = "SELECT DISTINCT t.trade_pk AS tradePk, t.price AS price, t.cnt AS cnt, t.option_buy_sell AS optionBuySell, " +
            "t.reason AS reason, t.trade_at AS tradeAt, t.stock_code AS stockCode, s.corp_name AS corpName, s.logo_url AS logoUrl " +
            "FROM trade t " +
            "INNER JOIN stock s ON t.stock_code = s.stock_code " +
            "LEFT OUTER JOIN trade_keyword tk ON t.trade_pk = tk.trade_pk " +
            "LEFT OUTER JOIN keyword k ON tk.keword_pk = k.keyword_pk " +
            "WHERE t.social_id = :socialId " +
            "AND (s.corp_name LIKE :searchTerm OR k.keyword LIKE :searchTerm) " +
            "AND t.trade_at BETWEEN :startDate AND :endDate " +
            "ORDER BY t.trade_at DESC, t.trade_pk DESC",
            nativeQuery = true)
    Page<TradeListResponseInterface> findTradeByNativeQuery(@Param("socialId") Long socialId,
                                          @Param("searchTerm") String searchTerm,
                                          @Param("startDate") LocalDateTime startDate,
                                          @Param("endDate") LocalDateTime endDate,
                                          PageRequest pageRequest);

    //    Page<Trade> findByUserAndIsDeletedFalse(User u, PageRequest pageRequest);
//
//    Page<Trade> findByUserAndStockAndIsDeletedFalse(User user, Stock stock, PageRequest pageRequest);
//
//    Page<Trade> findByUserAndTradeAtBetweenAndIsDeletedFalse(User user, LocalDateTime start, LocalDateTime end, PageRequest pageRequest);
//
//    Page<Trade> findByUserAndStockAndTradeAtBetweenAndIsDeletedFalse(User user, Stock stock, LocalDateTime start, LocalDateTime end, PageRequest pageRequest);

    @Query(value = "select distinct t.stock_code stockCode, s.corp_name corpName, s.logo_url logoUrl\n" +
            "from trade t, user u, stock s\n" +
            "where t.social_id = u.social_id\n" +
            "and t.stock_code = s.stock_code\n" +
            "and t.social_id = (:userPk);"
            , nativeQuery = true)
    Set<StockInterface> findDistintStockByUser(@Param("userPk") Long user);

    Trade findFirstByUserAndStock_StockCodeAndOptionBuySellOrderByTradeAtDesc(User user, String stock_stockCode, byte optionBuySell);


    @Query("SELECT SUM(t.cnt) FROM Trade t WHERE t.user = :user AND t.stock.stockCode = :stockCode AND t.optionBuySell = :optionBuySell")
    int getTotalCountForUserAndStock(
            @Param("user") User user,
            @Param("stockCode") String stockCode,
            @Param("optionBuySell") byte optionBuySell
    );


    List<Trade> findByUserAndStockAndIsDeletedFalse(User user, Stock stock);
}
