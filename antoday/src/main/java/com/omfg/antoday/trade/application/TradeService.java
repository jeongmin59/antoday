package com.omfg.antoday.trade.application;

import com.omfg.antoday.trade.dao.TradeRepository;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.trade.dto.TradeListResponseDto;
import com.omfg.antoday.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TradeService {

    @Autowired
    private TradeRepository tradeRepository;

    public Trade addTrade(Trade trade) {
        // trade에 userId 설정?
        return tradeRepository.save(trade);
    }


    public Object deleteTrade(long tradePk) {
        // isDeleted만 바꾸면 된다.
        return tradeRepository.deleteByTradePk(tradePk);
    }

    public Page<TradeListResponseDto> getTrade(User user, int page, String start, String end, String stockCode) {
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("tradeAt").descending());
//        if(start != null && end != null && stockCode != null) {
//            Page<Trade> trades = tradeRepository.findBySocialIdAndStockCodeAndTradeAtGreaterThanAndTradeAtLessThan(socialId, stockCode, start, end, pageRequest);
//            return trades;
//        }
//        else if(start == null && stockCode != null) {
//            Page<Trade> trades = tradeRepository.findBySocialIdAndTradeAtGreaterThanAndTradeAtLessThan(socialId, start, end, pageRequest);
//            return trades;
//        }
//        else if(start != null && stockCode == null) {
//            Page<Trade> trades = tradeRepository.findBySocialIdAndStockCode(socialId, stockCode, pageRequest);
//            return trades;
//        }
//        else {  //세개 다 널이다
//            Page<Trade> trades = tradeRepository.findBySocialId(socialId, pageRequest);
//            return trades;
//        }
        Page<Trade> trades = tradeRepository.findByUserAndIsDeletedFalse(user, pageRequest);
        Page<TradeListResponseDto> result =  trades.map(trade -> TradeListResponseDto.toDto(trade));
        System.out.println(result.toString());
        return result;
    }

    public Trade getTradeDetail(Long tradePk) {
        return tradeRepository.findByTradePk(tradePk);
    }
}
