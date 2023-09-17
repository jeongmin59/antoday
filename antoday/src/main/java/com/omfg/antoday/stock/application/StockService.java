package com.omfg.antoday.stock.application;

import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.dto.CorpListResponseDto;
import com.omfg.antoday.user.dao.UserRepository;
import com.omfg.antoday.user.dao.UserStockLikeRepository;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.domain.UserStockLike;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository stockRepository;
    private final UserStockLikeRepository userStockLikeRepository;
    private final UserRepository userRepository;

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