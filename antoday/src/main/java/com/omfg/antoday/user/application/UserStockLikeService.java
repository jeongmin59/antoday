package com.omfg.antoday.user.application;

import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.user.dao.UserRepository;
import com.omfg.antoday.user.dao.UserStockLikeRepository;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.domain.UserStockLike;
import com.omfg.antoday.user.dto.UserStockListResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserStockLikeService {

    private final UserStockLikeRepository userStockLikeRepository;
    private final StockRepository stockRepository;
    private final UserRepository userRepository;

    public void adduserStockLike(String stockCode) throws Exception {
        Optional<User> userOptional = userRepository.findBySocialId(1L);
        User user = userOptional.get();

        Stock stock = stockRepository.findByStockCode(stockCode);

        if (userOptional == null) {
            throw new Exception("유효하지 않은 사용자입니다.");
        } else if (stock == null) {
            throw new Exception("유효하지 않은 종목코드입니다.");
        }

        UserStockLike userStockLike = UserStockLike.builder()
                .user(user)
                .stock(stock)
                .build();
        userStockLikeRepository.save(userStockLike);
        log.info("[UserStock] 관심기업으로 등록 되었습니다.");
    }

    @Transactional
    public Page<UserStockListResponseDto> getUserStockList(int page) {
        PageRequest pageRequest = PageRequest.of(page, 10);

        Optional<User> userOptional = userRepository.findBySocialId(1L);
        User user = userOptional.get();

        Page<UserStockLike> userStockLikes = userStockLikeRepository.findByUserOrderByCreatedAtDesc(user, pageRequest);

        Page<UserStockListResponseDto> responseDto = userStockLikes.map(userStock -> new UserStockListResponseDto(
                userStock.getStock().getStockCode(),
                userStock.getStock().getCorpName(),
                userStock.getStock().getLogo_url()
        ));
        log.info("[UserStock] 관심기업이 조회되었습니다.");

        return responseDto;
    }
}