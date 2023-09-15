package com.omfg.antoday.trade.application;

import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.domain.StockInterface;
import com.omfg.antoday.stock.dto.StockListResponseDto;
import com.omfg.antoday.trade.dao.TradeKeywordRepository;
import com.omfg.antoday.trade.dao.TradeRepository;
import com.omfg.antoday.trade.domain.Keyword;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.trade.domain.TradeKeyword;
import com.omfg.antoday.trade.dto.TradeDetailResponseDto;
import com.omfg.antoday.trade.dto.TradeListResponseDto;
import com.omfg.antoday.trade.dto.TradeRequestDto;
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
import java.util.stream.Collectors;

@Service
public class TradeService {

    @Autowired
    private TradeRepository tradeRepository;

    @Autowired
    private TradeKeywordRepository tradeKeywordRepository;

    @Autowired
    private StockRepository stockRepository;

    public Trade addTrade(TradeRequestDto dto,User user) {
        Trade trade = TradeRequestDto.toTrade(dto, user);
        Trade t =  tradeRepository.save(trade);

        // 키워드 저장
        // 비효율적인 것 같긴 한데 일단은 돌아감
        dto.getKeywords().stream().forEach(word -> {
            TradeKeyword tk = TradeKeyword.builder()
                    .keyword(Keyword.builder().keyword(word).build())
                    .trade(t)
                    .build();

            tradeKeywordRepository.save(tk);
        });
        return t;
    }

    public Trade updateTrade(TradeRequestDto dto,User user) {

        // 기존 trade 가져오기
        Trade trade = tradeRepository.findById(dto.getTradePk()).get();

        trade.update(dto);
        Trade t =  tradeRepository.save(trade);
        System.out.println("1번 완료!!!!!!!!!!!!!!!");

        dto.getKeywords().stream().forEach(word -> {
            TradeKeyword tk = TradeKeyword.builder()
                    .keyword(Keyword.builder().keyword(word).build())
                    .trade(trade)
                    .build();
            tradeKeywordRepository.save(tk);
        });
        return t;
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

    public Set<StockListResponseDto> getTradeCorp(User user) {
        Set<StockInterface> set = tradeRepository.findDistintStockByUser(user.getSocialId());
        return set.stream().map(trade -> {
            StockListResponseDto d = StockListResponseDto.toDto(trade);
            System.out.println(d);
            return d;
        }).collect(Collectors.toSet());
    }
}
