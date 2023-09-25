package com.omfg.antoday.trade.application;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.domain.StockInterface;
import com.omfg.antoday.stock.dto.StockListResponseDto;
import com.omfg.antoday.trade.dao.KeywordRepository;
import com.omfg.antoday.trade.dao.TradeKeywordRepository;
import com.omfg.antoday.trade.dao.TradeRepository;
import com.omfg.antoday.trade.domain.Keyword;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.trade.domain.TradeKeyword;
import com.omfg.antoday.trade.dto.*;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.utils.UserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;
    private final TradeKeywordRepository tradeKeywordRepository;
    private final StockRepository stockRepository;
    private final KeywordRepository keywordRepository;

    @Transactional
    public Trade addTrade(TradeSaveRequestDto dto, UserDetailsImpl userDetails) {
        User user = UserUtils.getUserFromToken(userDetails);

        Trade trade = TradeSaveRequestDto.toTrade(dto, user);
        Trade t =  tradeRepository.save(trade);

        // 키워드 저장
        // 비효율적인 것 같긴 한데 일단은 돌아감
        // keyword 중복생성 수정
        dto.getKeywords().stream().forEach(word -> {
            Keyword keyword;
            if (keywordRepository.existsById(word)) {
                keyword = keywordRepository.findById(word).get();
//                keyword = keywordRepository.findById(wo)
            }else {
                keyword = Keyword.builder().keyword(word).build();
            }
            TradeKeyword tk = TradeKeyword.builder()
                    .keyword(keyword)
                    .trade(t)
                    .build();
            tradeKeywordRepository.save(tk);
        });
        return t;
    }

    @Transactional
    public Trade updateTrade(TradeRequestDto dto,User user) {

        // 기존 trade 가져오기
        Trade trade = tradeRepository.findById(dto.getTradePk()).get();

        // 기존 키워드 삭제
        tradeKeywordRepository.deleteByTrade(trade);

        // trade의 이유 update
        trade.update(dto);
        Trade t =  tradeRepository.save(trade);
        System.out.println("1번 완료!!!!!!!!!!!!!!!");

        // 키워드 저장
        // keyword 중복생성 수정
        dto.getKeywords().stream().forEach(word -> {
            Keyword keyword;
            if (keywordRepository.existsById(word)) {
                keyword = keywordRepository.findById(word).get();
            } else {
                keyword = Keyword.builder().keyword(word).build();
            }
            TradeKeyword tk = TradeKeyword.builder()
                    .keyword(keyword)
                    .trade(t)
                    .build();
            tradeKeywordRepository.save(tk);
        });
        return t;
    }

    public Object deleteTrade(long tradePk) {
        // isDeleted만 바꾸면 된다.
        return tradeRepository.deleteByTradePk(tradePk);
    }


    public Page<TradeListResponseDto> getTrade(UserDetailsImpl userDetails, int page, String start, String end, String keyword) {
        User user = UserUtils.getUserFromToken(userDetails);

        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("tradePk").descending());
//        Stock stock = Stock.builder().stockCode(stockCode).build();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        if(start == null) start = "1900-01-01 00:00:00";
        if(end == null) end = LocalDateTime.now().format(formatter);
        LocalDateTime st = LocalDateTime.parse(start, formatter);
        LocalDateTime ed = LocalDateTime.parse(end, formatter);

        if(keyword == null) keyword = "";
        keyword = '%'+keyword+'%';

        Page<TradeListResponseInterface> trades = tradeRepository.findTradeByNativeQuery(user.getSocialId()
                , keyword, st, ed,pageRequest);

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

    public Set<StockListResponseDto> getTradeCorp(UserDetailsImpl userDetails) {
        User user = UserUtils.getUserFromToken(userDetails);

        Set<StockInterface> set = tradeRepository.findDistintStockByUser(user.getSocialId());
        return set.stream().map(trade -> {
            StockListResponseDto d = StockListResponseDto.toDto(trade);
            System.out.println(d);
            return d;
        }).collect(Collectors.toSet());
    }

    public RoiResponseDto getRoiStock(UserDetailsImpl userDetails, String stockCode) {
        User user = UserUtils.getUserFromToken(userDetails);

        Stock stock = stockRepository.findByStockCode(stockCode);
        List<Trade> trades = tradeRepository.findByUserAndStockAndIsDeletedFalse(user, stock);

        int sumCnt = 0;
        double total = 0;
        double avgPrice = 0;
        double profit = 0;

        List<Double> profits = new ArrayList<>();
        List<Double> rois = new ArrayList<>();

        for (Trade trade : trades) {
            if (trade.getOptionBuySell() == 0) {
                sumCnt += trade.getCnt();
                total += trade.getCnt() * trade.getPrice();
                avgPrice = total / sumCnt;
            } else {
                sumCnt -= trade.getCnt();
                total -= trade.getCnt() * avgPrice;
                profit = trade.getCnt() * (trade.getPrice() - avgPrice);
                profits.add(profit);
                rois.add(profit / (avgPrice * trade.getCnt()) * 100 - 0.23);
            }
        }

        int sumProfit = (int)profits.stream().mapToDouble(Double::doubleValue).sum();
        double avgRoiValue = rois.stream().mapToDouble(Double::doubleValue).average().orElse(0);
        double roundedAvgRoi= Math.round(avgRoiValue*100.0)/100.0;
        
        return new RoiResponseDto(sumProfit, roundedAvgRoi);
    }
}
