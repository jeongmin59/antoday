package com.omfg.antoday.stock.api;

import com.omfg.antoday.stock.application.StockService;
import com.omfg.antoday.stock.dto.CorpListResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api( tags = "주식 종목(기업) 관련 API" )
public class StockController {

    private final StockService stockService;

    @GetMapping("/corp/search")
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

    @GetMapping("/stock/info")
    public ResponseEntity stockInfoAdd() {
        stockService.getStockInfo();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/stock/logo")
    public ResponseEntity stockLogoUrlAdd() {
        stockService.getStockLogoUrl();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
