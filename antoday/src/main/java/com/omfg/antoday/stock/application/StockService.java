package com.omfg.antoday.stock.application;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.dto.CorpListResponseDto;
import com.omfg.antoday.stock.dto.StockPriceResponseDto;
import com.omfg.antoday.trade.dao.TradeRepository;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.user.dao.UserRepository;
import com.omfg.antoday.user.dao.UserStockLikeRepository;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.domain.UserStockLike;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
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

    public StockPriceResponseDto getStockDefaultPrice(String stockCode, String status, UserDetailsImpl userDetails) {
        int price = 0;
        int totalCount = -1;
        if (Objects.equals(status, "매수")) {
            price = getPreviousClosingPrice(stockCode);
        } else if (Objects.equals(status, "매도")) {
            User user = getUserFromToken(userDetails);

            byte optionBuySell = 0; // 수정 필요(0이 매도인지 매수인지 확인 필요)
            price = getPreviousBuyPrice(stockCode, user, optionBuySell);
            totalCount = tradeRepository.getTotalCountForUserAndStock(user, stockCode, optionBuySell);
        }

        return StockPriceResponseDto.builder()
                .status(status)
                .stockCode(stockCode)
                .price(price)
                .totalCnt(totalCount)
                .build();
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

    // 전일종가 불러오기
    private int getPreviousClosingPrice(String stockCode) {
        String baseUrl = "https://finance.naver.com/item/main.naver?code=" + stockCode;

        try {
            Document document = Jsoup.connect(baseUrl).get();

            Element table = document.select("table:has(caption:contains(외국인 기관))").first();

            assert table != null;
            Elements rows = table.select("tr");
            Element priceCell = rows.get(2).selectFirst("td em");

            if (priceCell != null) {
                String priceSt = priceCell.text().replace(",", "");
                int price = Integer.parseInt(priceSt);
                log.info("[Corp] 전일 종가 조회");
                return price;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    // 직전 매수가 조회
    private int getPreviousBuyPrice(String stockCode, User user, byte optionBuySell) {
        Trade lastTrade = tradeRepository.findFirstByUserAndStock_StockCodeAndOptionBuySellOrderByTradeAtDesc(user, stockCode, optionBuySell);
        return lastTrade != null ? lastTrade.getPrice() : 0;
    }

    private User getUserFromToken(UserDetailsImpl userDetails) {
        User user = userDetails.getUser();
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "[Token] 유효하지 않은 사용자입니다.");
        }
        return user;
    }
}