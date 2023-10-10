package com.omfg.antoday.stock.api;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.stock.application.StockService;
import com.omfg.antoday.stock.dto.CorpListResponseDto;
import com.omfg.antoday.stock.dto.StockPriceListResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

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

    @GetMapping("/price")
    @ApiOperation(value = "기본 매도가 조회 및 매수 리스트 조회")
    public ResponseEntity<List<StockPriceListResponseDto>> stockPriceListGet(@ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                             @RequestParam(required = true) String status) {
        List<StockPriceListResponseDto> stockPriceList = stockService.getStockPriceList(status, userDetails);
        return new ResponseEntity<>(stockPriceList, HttpStatus.OK);
    }
}