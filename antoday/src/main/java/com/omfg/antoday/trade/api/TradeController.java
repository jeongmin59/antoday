package com.omfg.antoday.trade.api;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.stock.dto.StockListResponseDto;
import com.omfg.antoday.trade.application.TradeService;
import com.omfg.antoday.trade.domain.Trade;
import com.omfg.antoday.trade.dto.*;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.transaction.Transactional;
import java.util.*;

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
    public ResponseEntity<Trade> tradeAdd(@RequestBody TradeSaveRequestDto trade,
                                          @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Trade result = tradeService.addTrade(trade, userDetails);
        if(result == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @PutMapping
    @ApiOperation(value = "매매기록 수정", notes = "매매 정보 입력")
    public ResponseEntity<Trade> tradeModify(@RequestBody TradeRequestDto trade) {
        return new ResponseEntity<>(tradeService.updateTrade(trade),HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{trade_pk}")
    @ApiOperation(value = "매매기록 삭제", notes = "매매 정보 pk입력")
    public ResponseEntity<Object> tradeDelete(@PathVariable("trade_pk") String tradePk) {
        return new ResponseEntity<>(tradeService.deleteTrade(Long.parseLong(tradePk)), HttpStatus.OK);
    }

    //매매기록 전체 조회 Option이 없으면 그냥 get
    //매매기록 기간별, 종목별 조회
    @GetMapping
    @ApiOperation(value = "매매 기록 list", notes = "page필수(0부터), start(형식 : yyyy-MM-dd HH:mm:ss), end, keyword(검색 키워드 또는 기업명) 선택")
    public ResponseEntity<Page<TradeListResponseDto>> tradeOptionGet(@RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(required = false) String start,
                                                             @RequestParam(required = false) String end,
                                                             @RequestParam(required = false) String keyword,
                                                             @RequestParam(required = false, defaultValue = "DEFAULT") TradeFilter tradeFilter,
                                                             @RequestParam(required = false, defaultValue = "LATEST") TradeOrderBy tradeOrderBy,
                                                             @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Page<TradeListResponseDto> result = tradeService.getTrade(userDetails, page, start, end, keyword, tradeFilter, tradeOrderBy);
        return new ResponseEntity<>(result, HttpStatus.OK);
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
    public ResponseEntity<Page<StockListResponseDto>> tradeCorpGet(@RequestParam(name = "page", defaultValue = "0") int page,
                                                                   @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return new ResponseEntity<>(tradeService.getTradeCorp(page, userDetails), HttpStatus.OK);
    }

    @GetMapping("/makeDummyStock/{stock_code}")
    public ResponseEntity<Object> makeDummy(@RequestParam String stock_code) {
        tradeService.makeDummy(stock_code);
        return new ResponseEntity<>(1, HttpStatus.OK);
    }

    @GetMapping("/corp/roi")
    @ApiOperation(value = "모든 기업에 대한 사용자의 투자 정보")
    public ResponseEntity<List<StockRoiResponseDto>> tradeCorpDetailGet(@ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return new ResponseEntity<>(tradeService.getTradeCorpDetail(userDetails), HttpStatus.OK);
    }
}
