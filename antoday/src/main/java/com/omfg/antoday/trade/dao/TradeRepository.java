package com.omfg.antoday.trade.dao;

import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.domain.StockInterface;
import com.omfg.antoday.trade.domain.Trade;
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

    @Query(value =
            "SELECT DISTINCT t.trade_pk AS tradePk, t.price AS price, t.cnt AS cnt, t.option_buy_sell AS optionBuySell, " +
                    "t.reason AS reason, t.trade_at AS tradeAt, t.stock_code AS stockCode, s.corp_name AS corpName, s.logo_url AS logoUrl " +
                    "FROM trade t " +
                    "INNER JOIN stock s ON t.stock_code = s.stock_code " +
                    "LEFT OUTER JOIN trade_keyword tk ON t.trade_pk = tk.trade_pk " +
                    "LEFT OUTER JOIN keyword k ON tk.keyword = k.keyword " +
                    "WHERE t.social_id = :socialId " +
                    "AND (s.corp_name LIKE :searchTerm OR k.keyword LIKE :searchTerm) " +
                    "AND t.is_deleted = 0 " +
                    "AND (s.corp_name LIKE :searchTerm OR k.keyword LIKE :searchTerm) " +
                    "AND t.trade_at BETWEEN :startDate AND :endDate " +

                    "And CASE WHEN :filterType='buy' THEN (t.option_buy_sell=0) " +
                    "WHEN :filterType='sell' THEN (t.option_buy_sell=1) " +
                    "WHEN :filterType='unwritten' THEN ((LENGTH(t.reason)= 0 AND tk.keyword IS NULL)) ELSE TRUE END " +

                    "ORDER BY CASE WHEN :orderBy='oldest' THEN t.trade_at END ASC," +
                    "CASE WHEN :orderBy!='oldest' OR :orderBy IS NULL THEN t.trade_at END DESC",
            nativeQuery = true)
    Page<TradeListResponseInterface> findTradeByNativeQuery(@Param("socialId") Long socialId,
                                                                 @Param("searchTerm") String searchTerm,
                                                                 @Param("startDate") LocalDateTime startDate,
                                                                 @Param("endDate") LocalDateTime endDate,
                                                                 @Param("filterType") String filterType,
                                                                 @Param("orderBy") String orderBy,
                                                                 PageRequest pageRequest);

    @Query(value = "SELECT DISTINCT s.stock_code AS stockCode, s.corp_name AS corpName, s.logo_url AS logoUrl " +
            "FROM trade t " +
            "INNER JOIN stock s ON t.stock_code = s.stock_code " +
            "LEFT OUTER JOIN trade_keyword tk ON t.trade_pk = tk.trade_pk " +
            "LEFT OUTER JOIN keyword k ON tk.keyword = k.keyword " +
            "WHERE t.social_id = :socialId " +
            "AND t.is_deleted = 0 " +
            "AND (s.corp_name LIKE :searchTerm OR k.keyword LIKE :searchTerm) "
            , nativeQuery = true)
    Set<StockInterface> findstockByNativeQuery(@Param("socialId") Long socialId, @Param("searchTerm") String searchTerm);

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
            "AND t.is_deleted = 0 " +
            "and t.social_id = (:userPk);"
            , nativeQuery = true)
    Set<StockInterface> findDistintStockByUser(@Param("userPk") Long user);

    @Query(value = "select distinct t.stock_code stockCode, s.corp_name corpName, s.logo_url logoUrl\n" +
            "from trade t, user u, stock s\n" +
            "where t.social_id = u.social_id\n" +
            "and t.stock_code = s.stock_code\n" +
            "AND t.is_deleted = 0 " +
            "and t.social_id = (:userPk)"
            ,
            countQuery = "select distinct t.stock_code stockCode, s.corp_name corpName, s.logo_url logoUrl\n" +
                    "from trade t, user u, stock s\n" +
                    "where t.social_id = u.social_id\n" +
                    "and t.stock_code = s.stock_code\n" +
                    "AND t.is_deleted = 0 " +
                    "and t.social_id = (:userPk)",
            nativeQuery = true)
    Page<StockInterface> findDistintStockByUserPage(@Param("userPk") Long user, PageRequest pageRequest);



    @Query("SELECT SUM(CASE WHEN t.optionBuySell = 0 THEN t.cnt ELSE -t.cnt END) FROM Trade t WHERE t.user = :user AND t.stock.stockCode = :stockCode")
    Integer getNetCountForUserAndStock(
            @Param("user") User user,
            @Param("stockCode") String stockCode
    );

    List<Trade> findByUserAndStockAndIsDeletedFalse(User user, Stock stock);

    List<Trade> findByUserAndOptionBuySell(User user, byte optionBuySell);

}
