package com.omfg.antoday.trade.api;

import com.omfg.antoday.stock.dto.StockListResponseDto;
import com.omfg.antoday.trade.application.TradeService;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.trade.dto.TradeDetailResponseDto;
import com.omfg.antoday.trade.dto.TradeListResponseDto;
import com.omfg.antoday.trade.dto.TradeRequestDto;
import com.omfg.antoday.user.dao.UserRepository;
import com.omfg.antoday.user.domain.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/trade")
@Api( tags = "매매기록 CRUD, 매매한 기업목록" )
@RequiredArgsConstructor
public class TradeController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;

    private final TradeService tradeService;

    @PostMapping
    @ApiOperation(value = "매매기록 추가", notes = "tradePk는 입력하지 말것.")
    public ResponseEntity<Trade> tradeAdd(@RequestBody TradeRequestDto trade) {
        // 키워드 들어오면 어떻게 할지
        Optional<User> dummyUser = userRepository.findById(1L);
        return new ResponseEntity<>(tradeService.addTrade(trade, dummyUser.get()),HttpStatus.OK);
    }

    @PutMapping
    @ApiOperation(value = "매매기록 수정", notes = "매매 정보 입력")
    public ResponseEntity<Trade> tradeModify(@RequestBody TradeRequestDto trade) {
        Optional<User> dummyUser = userRepository.findById(1L);
        return new ResponseEntity<>(tradeService.updateTrade(trade, dummyUser.get()),HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{trade_pk}")
    @ApiOperation(value = "매매기록 삭제", notes = "매매 정보 pk입력")
    public ResponseEntity<Object> tradeDelete(@PathVariable("trade_pk") String tradePk) {
        return new ResponseEntity<>(tradeService.deleteTrade(Long.parseLong(tradePk)), HttpStatus.OK);
    }

    @PatchMapping("/{trade_pk}")
    @ApiOperation(value = "매매 AI분석 결과 요청", notes = "매매 정보 pk입력")
    public ResponseEntity<String> tradeAnalyzeAdd(@PathVariable("trade_pk") String tradePk) {
        return new ResponseEntity<>("결과분석 완료되었습니당",HttpStatus.OK);
    }


    //매매기록 전체 조회 Option이 없으면 그냥 get
    //매매기록 기간별, 종목별 조회
    @GetMapping
    @ApiOperation(value = "매매 기록 list", notes = "page필수(0부터), start(형식 : yyyy-MM-dd HH:mm:ss), end, stockcode 선택")
    public ResponseEntity<Page<TradeListResponseDto>> tradeOptionGet(@RequestParam String page, @RequestParam(required = false) String start , @RequestParam(required = false) String end, @RequestParam(required = false) String stockCode) {

        Optional<User> dummyUser = userRepository.findById(1L);
        return new ResponseEntity<>(tradeService.getTrade(dummyUser.get(), Integer.parseInt(page), start,end, stockCode), HttpStatus.OK);
    }

    //매매기록 검색 조회
    @GetMapping("/search")
    @ApiOperation(value = "매매 기록 list - 검색어", notes = "page, 검색어")
    public ResponseEntity<List<Trade>> tradeSearchGet(@RequestParam String keyword, @RequestParam String page) {
        List<Trade> list = new ArrayList();
        list.add(new Trade());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //매매기록 개별 조회
    @GetMapping("/{trade_pk}")
    @ApiOperation(value = "매매 기록 detail", notes = "trade_pk 받아오기")
    public ResponseEntity<TradeDetailResponseDto> tradeDetailGet(@PathVariable String trade_pk) {
//        TradeDetailResponseDto trade = tradeService.getTradeDetail(Long.parseLong(trade_pk));
//        List<TradeKeyword> keyword = tradeService.getTradeDetailKeyWord(trade);
//
//        TradeListResponseDto info = TradeListResponseDto.toDto(trade);
//        info.setKeyword(keyword.stream().map(tradeKeyword -> tradeKeyword.getKeyword().getKeyword()).toList());
        System.out.println(trade_pk+" : Controller");
        TradeDetailResponseDto result = tradeService.getTradeDetail(Long.parseLong(trade_pk));
        System.out.println(result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping( "/corp")
    @ApiOperation(value = "사용자가 투자한 기업 리스트", notes = "")
    public ResponseEntity<Set<StockListResponseDto>> tradeCorpGet() {
        Optional<User> dummyUser = userRepository.findById(1L);
        return new ResponseEntity<>(tradeService.getTradeCorp(dummyUser.get()), HttpStatus.OK);
    }

    // 기업 수익률 계산
    @GetMapping("/roi")
    @ApiOperation(value = "해당 기업/전체 수익률 계산", notes = " 안넣으면 전체 수익률.")
    public ResponseEntity<Object> roiStockGet(@RequestParam String stock_code) {
        return new ResponseEntity<>("1", HttpStatus.OK);
    }

    @GetMapping("/makeDummyStock/{stock_code}")
    public ResponseEntity<Object> makeDummy(@RequestParam String stock_code) {
        tradeService.makeDummy(stock_code);
        return new ResponseEntity<>(1, HttpStatus.OK);
    }
}
