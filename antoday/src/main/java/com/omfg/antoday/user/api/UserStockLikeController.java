package com.omfg.antoday.user.api;

import com.omfg.antoday.user.application.UserStockLikeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Api(tags = "관심 기업 관련 API")
@RequiredArgsConstructor
public class UserStockLikeController {

    private final UserStockLikeService userStockLikeService;

    @ApiOperation(value = "관심 기업 등록", notes = "토큰, stockCode 필요" )
    @PostMapping("/userstock")
    public ResponseEntity<String> userStockAdd(@RequestParam String stockCode) throws Exception {
        // 추후 현재 사용자 정보 받아와서 사용하는 것으로 변경 필요
        userStockLikeService.adduserStockLike(stockCode);
        return new ResponseEntity<String>("성공", HttpStatus.OK);
    }
}