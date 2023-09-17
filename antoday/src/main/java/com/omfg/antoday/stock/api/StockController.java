package com.omfg.antoday.stock.api;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.stock.application.StockService;
import com.omfg.antoday.stock.dto.CorpListResponseDto;
import com.omfg.antoday.stock.dto.StockPriceResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/corp")
@RequiredArgsConstructor
@Api( tags = "주식 종목(기업) 관련 API" )
public class StockController {

    private final StockService stockService;

    @GetMapping("/search")
    @ApiOperation(value = "기업 검색 결과 LIST", notes = "keyword 입력 필수/1페이지에 10개씩 반환")
    public ResponseEntity<?> corpSearchListGet(@RequestParam String keyword,@RequestParam(name = "page", defaultValue = "0") int page) {
        if (keyword == null || keyword.isEmpty()) {
            return new ResponseEntity<>("KEYWORD를 입력해주세요", HttpStatus.BAD_REQUEST);
        }
        if (page < 0) {
            return new ResponseEntity<>("페이지 번호는 0 이상이어야 합니다.", HttpStatus.BAD_REQUEST);
        }

        Page<CorpListResponseDto> corpSearchList = stockService.getCorpSearchList(keyword, page);

        if (corpSearchList.getSize() == 0) {
            return new ResponseEntity<>("검색 결과가 없습니다.", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(corpSearchList, HttpStatus.OK);
    }

    @GetMapping("/{stockCode}")
    @ApiOperation(value = "기본 매수/매도가 조회")
    public ResponseEntity<StockPriceResponseDto> stockDefaultPriceGet(@PathVariable("stockCode") String stockCode, @RequestParam String status,
                                                                      @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetails) {
        StockPriceResponseDto stockPriceResponseDto = stockService.getStockDefaultPrice(stockCode, status, userDetails);
        return new ResponseEntity<>(stockPriceResponseDto, HttpStatus.OK);
    }
}