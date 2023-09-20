package com.omfg.antoday.stock.application;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.dto.CorpListResponseDto;
import com.omfg.antoday.stock.dto.StockPriceListResponseDto;
import com.omfg.antoday.trade.dao.TradeRepository;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.user.dao.UserRepository;
import com.omfg.antoday.user.dao.UserStockLikeRepository;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.domain.UserStockLike;
import com.omfg.antoday.utils.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository stockRepository;
    private final UserStockLikeRepository userStockLikeRepository;
    private final UserRepository userRepository;
    private final TradeRepository tradeRepository;

    @Value("${dart.apiKey}")
    String dartKey;

    @Value("${dart.path}")
    String filePath;

    private static final int PAGE_SIZE = 10;

    @Transactional
    public Page<CorpListResponseDto> getCorpSearchList(String keyword, int page) {
        List<Stock> corpListStartKeyword = stockRepository.findByCorpNameStartingWith(keyword);
        List<Stock> corpListContainKeyword = stockRepository.findByCorpNameContainingOrderByCorpNameAsc(keyword);

        List<Stock> totalList = new ArrayList<>(corpListStartKeyword);
        totalList.addAll(corpListContainKeyword);

        // 중복 제거
        List<Stock> distinctTotalList = new ArrayList<>(new LinkedHashSet<>(totalList));

        PageRequest pageRequest = PageRequest.of(page, PAGE_SIZE);

        // distinctTotalList를 Page 객체로 만들기
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), distinctTotalList.size());
        Page<Stock> corpSearchList = new PageImpl<>(distinctTotalList.subList(start, end), pageRequest, distinctTotalList.size());

        // 현재 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAuthenticated = authentication != null && authentication.isAuthenticated();

        return corpSearchList.map(stock -> {
            Boolean isLiked = null;
            if (isAuthenticated) {
                if (!Objects.equals(authentication.getName(), "anonymousUser")) {   // 로그인 했을 경우
                    isLiked = isStockLikedByUser(stock, Long.valueOf(authentication.getName()));
                }
            }
            return CorpListResponseDto.toEntity(stock, isLiked);
        });
    }

    public List<StockPriceListResponseDto> getStockPriceList(String status, UserDetailsImpl userDetails) {
        if (status.equals("매수")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "[Corp] 매도 요청만 가능합니다.");
        }

        User user = UserUtils.getUserFromToken(userDetails);

        Map<String, StockPriceListResponseDto> stockInfoMap = new HashMap<>();

        byte optionBuySell = 0;
        List<Trade> userTrades = tradeRepository.findByUserAndOptionBuySell(user, optionBuySell);

        for (Trade trade : userTrades) {
            String stockCode = trade.getStock().getStockCode();

            // 이미 해당 종목에 대한 정보가 있는지 확인
            StockPriceListResponseDto stockInfo = stockInfoMap.get(stockCode);
            if (stockInfo == null) {
                Stock stock = stockRepository.findByStockCode(stockCode);

                Integer netCountObj = tradeRepository.getNetCountForUserAndStock(user, stockCode);
                int netCount = (netCountObj != null) ? netCountObj : 0;

                int lastBuyPriceUpdated;
                if(trade.getOptionBuySell() == 0){
                    lastBuyPriceUpdated=trade.getPrice();
                }else{
                    lastBuyPriceUpdated=0;
                }

                StockPriceListResponseDto newStockInfo =
                        StockPriceListResponseDto.builder()
                                .stockCode(stockCode)
                                .corpName(stock.getCorpName())
                                .logoUrl(stock.getLogo_url())
                                .lastBuyPrice(lastBuyPriceUpdated)
                                .netCount(netCount)
                                .build();

                // Map에 업데이트된 객체 저장
                stockInfoMap.put(newStockInfo.getStockCode(), newStockInfo);
            }
            else {
                updateLastBuyPriceAndNetCount(trade, user, stockInfo);
            }
        }

        List<StockPriceListResponseDto> stockInfoList = new ArrayList<>(stockInfoMap.values());

        return stockInfoList;
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

    private void updateLastBuyPriceAndNetCount(Trade trade, User user, StockPriceListResponseDto stockInfo){
        if(trade.getOptionBuySell() == 0){
            stockInfo.setLastBuyPrice(trade.getPrice());
        }
        Integer netCountObj = tradeRepository.getNetCountForUserAndStock(user, trade.getStock().getStockCode());
        int netCount = (netCountObj != null) ? netCountObj : 0;
        stockInfo.setNetCount(netCount);
    }
}