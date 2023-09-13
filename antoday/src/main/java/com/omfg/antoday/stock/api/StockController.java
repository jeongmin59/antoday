package com.omfg.antoday.stock.api;

import com.omfg.antoday.stock.application.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("stock")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

    @GetMapping("/info")
    public ResponseEntity stockInfoAdd() {
        System.out.println("실행함");
        stockService.getStockInfo();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
