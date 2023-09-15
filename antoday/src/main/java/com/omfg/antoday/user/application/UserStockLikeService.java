package com.omfg.antoday.user.application;

import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.user.dao.UserRepository;
import com.omfg.antoday.user.dao.UserStockLikeRepository;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.domain.UserStockLike;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    }
}
