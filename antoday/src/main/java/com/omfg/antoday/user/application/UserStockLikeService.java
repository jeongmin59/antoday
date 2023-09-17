package com.omfg.antoday.user.application;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.user.dao.UserStockLikeRepository;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.domain.UserStockLike;
import com.omfg.antoday.user.dto.UserStockListResponseDto;
import com.omfg.antoday.utils.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserStockLikeService {

    private final UserStockLikeRepository userStockLikeRepository;
    private final StockRepository stockRepository;

    public void adduserStockLike(String stockCode, UserDetailsImpl userDetails) {
        User user = UserUtils.getUserFromToken(userDetails);
        Stock stock = getStockByStockCode(stockCode);

        if (userStockLikeRepository.existsByStockAndUser(stock, user)) {
            log.info("[UserStock] 이미 관심 기업으로 등록되어 있습니다.");
            throw new ResponseStatusException(HttpStatus.CONFLICT, "[UserStock] 이미 관심 기업으로 등록되어 있습니다.");
        }

        UserStockLike userStockLike = UserStockLike.builder()
                .user(user)
                .stock(stock)
                .build();
        userStockLikeRepository.save(userStockLike);
        log.info("[UserStock] 관심기업으로 등록 되었습니다.");
    }

    @Transactional
    public Page<UserStockListResponseDto> getUserStockList(int page, UserDetailsImpl userDetails) {
        PageRequest pageRequest = PageRequest.of(page, 10);
        User user = UserUtils.getUserFromToken(userDetails);
        Page<UserStockLike> userStockLikes = userStockLikeRepository.findByUserOrderByCreatedAtDesc(user, pageRequest);

        log.info("[UserStock]" + user.getUserName() + "님의 관심기업이 조회되었습니다.");
        return userStockLikes.map(userStock -> new UserStockListResponseDto(
                userStock.getStock().getStockCode(),
                userStock.getStock().getCorpName(),
                userStock.getStock().getLogo_url(),
                true
        ));
    }

    @Transactional
    public boolean deleteUserStock(String stockCode, UserDetailsImpl userDetails) {
        User user = UserUtils.getUserFromToken(userDetails);
        Stock stock = getStockByStockCode(stockCode);

        UserStockLike userStockLike = userStockLikeRepository.findByStockAndUser(stock, user);
        if (userStockLike != null) {
            userStockLikeRepository.deleteById(userStockLike.getUserStockLikePk());
            log.info("[UserStock] 관심기업 등록 취소했습니다.");
            return true;
        }
        return false;
    }

    private Stock getStockByStockCode(String stockCode) {
        Stock stock = stockRepository.findByStockCode(stockCode);
        if (stock == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "[Stock] 조회되지 않는 종목 코드입니다.");
        }
        return stock;
    }
}