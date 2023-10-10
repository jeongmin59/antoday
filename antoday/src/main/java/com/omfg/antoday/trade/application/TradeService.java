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
import com.omfg.antoday.user.dao.UserRepository;
import com.omfg.antoday.user.dao.UserStockLikeRepository;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.domain.UserStockLike;
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
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;
    private final TradeKeywordRepository tradeKeywordRepository;
    private final StockRepository stockRepository;
    private final KeywordRepository keywordRepository;
    private final UserRepository userRepository;
    private final UserStockLikeRepository userStockLikeRepository;

    @Transactional
    public Trade addTrade(TradeSaveRequestDto dto, UserDetailsImpl userDetails) {
        User user = UserUtils.getUserFromToken(userDetails);

        if(dto.getOptionBuySell() == 0) {   //매수
            Trade trade = TradeSaveRequestDto.toTrade(dto, user);
            Trade t =  tradeRepository.save(trade);
            return t;
        }
        else {  //매도
            // 매도 가능 수량으로 매도 주문을 보냈는지 확인.
            Integer netCountObj = tradeRepository.getNetCountForUserAndStock(user, dto.getStockCode());
            int netCount = (netCountObj != null) ? netCountObj : 0;

            if(dto.getCnt() > netCount) return null;

            Trade trade = TradeSaveRequestDto.toTrade(dto, user);
            Trade t =  tradeRepository.save(trade);
            return t;
        }
        // 키워드 저장은 필요 없음. 무조건 수정에서만 키워드 저장이 들어온다.
    }

    @Transactional
    public Trade updateTrade(TradeRequestDto dto) {

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


    public Page<TradeListResponseDto> getTrade(UserDetailsImpl userDetails, int page, String start, String end,
                                               String keyword, TradeFilter tradeFilter, TradeOrderBy tradeOrderBy) {
        User user = UserUtils.getUserFromToken(userDetails);

        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("tradePk").descending());
//        Stock stock = Stock.builder().stockCode(stockCode).build();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        if(start == null) start = "1900-01-01 00:00:00";
        if(end == null) end = LocalDateTime.now().plusHours(9).format(formatter);
        LocalDateTime st = LocalDateTime.parse(start, formatter);
        LocalDateTime ed = LocalDateTime.parse(end, formatter);

        if(keyword == null) keyword = "";
        keyword = '%'+keyword+'%';

        if (tradeFilter == null) tradeFilter = TradeFilter.DEFAULT;

        Page<TradeListResponseInterface> trades =
                tradeRepository.findTradeByNativeQuery(user.getSocialId(), keyword,
                        st ,ed , tradeFilter.toString(), tradeOrderBy.toString() ,pageRequest);

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

    public Page<StockListResponseDto> getTradeCorp(int page, UserDetailsImpl userDetails) {
        PageRequest pageRequest = PageRequest.of(page, 5);
        User user = UserUtils.getUserFromToken(userDetails);

        Page<StockInterface> list = tradeRepository.findDistinctStockByUserPage(user.getSocialId(), pageRequest);
        return list.map(trade -> StockListResponseDto.toDto(trade));
    }

    public List<RoiResponseDto> getRoiStock(UserDetailsImpl userDetails, String keyword) {
        User user = UserUtils.getUserFromToken(userDetails);

        if(keyword == null) keyword = "";
        keyword = '%'+keyword+'%';
        // 1. trade에서 기업이름이 keyword에 해당한다면 stockcode 가져오기
        // 2. tradekeyword에서 keyword내용이 입력한 keyword에 해당한다면 stockcode 가져오기
        Set<StockInterface> set = tradeRepository.findstockByNativeQuery(user.getSocialId(), keyword);

        List<RoiResponseDto> result = new ArrayList<>();

        // 3. 각 stockcode에 대하여 trade list 가져오기
        for(StockInterface stocki : set) {
            System.out.println("trade-stockcode : "+stocki.getStockCode());
            Stock stock = stockRepository.findByStockCode(stocki.getStockCode());
            List<Trade> trades = tradeRepository.findByUserAndStockAndIsDeletedFalse(user, stock);

            // 수익률 계산
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

            result.add(RoiResponseDto.builder()
                    .totalProfit(sumProfit)
                    .avgRoi(roundedAvgRoi)
                    .stockCode(stock.getStockCode())
                    .corpName(stock.getCorpName())
                    .logoUrl(stock.getLogo_url()).build());
        }
        
        return result;
    }

    public List<StockRoiResponseDto> getTradeCorpDetail(UserDetailsImpl userDetails) {
        User user = UserUtils.getUserFromToken(userDetails);

        // 현재 사용자의 모든 거래 종목들 가져오기
        Set<StockInterface> stocks = tradeRepository.findDistinctStockByUser(user.getSocialId());

        List<StockRoiResponseDto> result = new ArrayList<>();

        System.out.println("모든 거래 종목들 가져오기!!!!!!!!!!!!!!!!!!");
        for(StockInterface stocki : stocks) {
            System.out.println(stocki.getStockCode());

            Stock stock = stockRepository.findByStockCode(stocki.getStockCode());
            List<Trade> trades = tradeRepository.findByUserAndStockAndIsDeletedFalse(user, stock);

            // 보유량, 평단가, 수익, 수익률 계산
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

            result.add(StockRoiResponseDto.builder()
                    .stockCode(stock.getStockCode())
                    .corpName(stock.getCorpName())
                    .cnt(sumCnt)
                    .avgPrice((int)avgPrice)
                    .profit(sumProfit)
                    .roi(roundedAvgRoi).build());


        }
        return result;
    }

    private boolean isStockLikedByUser(Stock stock, Long socialId) {
        Optional<User> optionalUser = userRepository.findById(socialId);
        UserStockLike userStockLike = null;
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            userStockLike = userStockLikeRepository.findByStockAndUser(stock, user);
        }
        return userStockLike != null;
    }
}
