package com.omfg.antoday.stock;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

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
