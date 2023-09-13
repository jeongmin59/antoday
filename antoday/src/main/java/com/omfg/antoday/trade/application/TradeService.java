package com.omfg.antoday.trade.application;

import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.trade.dao.TradeKeywordRepository;
import com.omfg.antoday.trade.dao.TradeRepository;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.trade.domain.TradeKeyword;
import com.omfg.antoday.trade.dto.TradeDetailResponseDto;
import com.omfg.antoday.trade.dto.TradeListResponseDto;
import com.omfg.antoday.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

@Service
public class TradeService {

    @Autowired
    private TradeRepository tradeRepository;

    @Autowired
    private TradeKeywordRepository tradeKeywordRepository;

    @Autowired
    private StockRepository stockRepository;

    public Trade addTrade(Trade trade) {
        // trade에 userId 설정?
        return tradeRepository.save(trade);
    }


    public Object deleteTrade(long tradePk) {
        // isDeleted만 바꾸면 된다.
        return tradeRepository.deleteByTradePk(tradePk);
    }

    public Page<TradeListResponseDto> getTrade(User user, int page, String start, String end, String stockCode) {
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("tradePk").descending());
        Stock stock = Stock.builder().stockCode(stockCode).build();

        Page<Trade> trades;
        if(start != null && end != null && stockCode != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime st = LocalDateTime.parse(start, formatter);
            LocalDateTime ed = LocalDateTime.parse(end, formatter);
            trades = tradeRepository.findByUserAndStockAndTradeAtBetweenAndIsDeletedFalse(user, stock, st, ed, pageRequest);
        }
        else if(start == null && stockCode != null) {
            trades = tradeRepository.findByUserAndStockAndIsDeletedFalse(user, stock, pageRequest);
        }
        else if(start != null && stockCode == null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime st = LocalDateTime.parse(start, formatter);
            LocalDateTime ed = LocalDateTime.parse(end, formatter);
            trades = tradeRepository.findByUserAndTradeAtBetweenAndIsDeletedFalse(user, st, ed, pageRequest);
        }
        else {
            trades = tradeRepository.findByUserAndIsDeletedFalse(user, pageRequest);
        }

        return trades.map(trade -> TradeListResponseDto.toDto(trade));

    }

    public TradeDetailResponseDto getTradeDetail(Long tradePk) {
        Trade t = tradeRepository.findByTradePk(tradePk);
        Set<TradeKeyword> keyword = t.getKeywords();
        System.out.println(t);
        System.out.println(keyword);
        return TradeDetailResponseDto.toDto(t);
    }

    public List<TradeKeyword> getTradeDetailKeyWord(Trade trade) {
        return tradeKeywordRepository.findByTrade(trade);
    }

    public Stock makeDummy(String stockCode) {
        return stockRepository.save(Stock.builder()
                        .stockCode(stockCode)
                        .corpCode(stockCode)
                        .corpName("test"+stockCode)
                        .logo_url("Test")
                        .market("SRX")
                        .stocks(100L)
                .build());
    }
}
