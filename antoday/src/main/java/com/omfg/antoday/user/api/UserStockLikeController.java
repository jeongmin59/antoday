package com.omfg.antoday.user.api;

import com.omfg.antoday.user.application.UserStockLikeService;
import com.omfg.antoday.user.dto.UserStockListResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userstock")
@Api(tags = "관심 기업 관련 API")
@RequiredArgsConstructor
public class UserStockLikeController {

    private final UserStockLikeService userStockLikeService;

    @PostMapping
    @ApiOperation(value = "관심 기업 등록", notes = "토큰, stockCode 필요" )
    public ResponseEntity<String> userStockAdd(@RequestParam String stockCode) throws Exception {
        // 추후 현재 사용자 정보 받아와서 사용하는 것으로 변경 필요
        userStockLikeService.adduserStockLike(stockCode);
        return new ResponseEntity<String>("성공", HttpStatus.CREATED);
    }

    @GetMapping
    @ApiOperation(value = "관심 기업 조회", notes = "토큰, page 필요(0부터 시작)" )
    public ResponseEntity<?> userStockGet(@RequestParam(name = "page", defaultValue = "0") int page) {
        // 추후 유저 정보 받아오는 것으로 변경
        Page<UserStockListResponseDto> userStockList = userStockLikeService.getUserStockList(page);
        return new ResponseEntity<>(userStockList, HttpStatus.OK);
    }

    @DeleteMapping("/{stockCode}")
    @ApiOperation(value = "관심 기업 등록 취소", notes = "토큰, stockCode 필요")
    public ResponseEntity<String> userStockRemove(@PathVariable("stockCode") String stockCode) {
        if (userStockLikeService.deleteUserStock(stockCode)) {
            return new ResponseEntity<>(stockCode + "가 삭제되었습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(stockCode + "를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }
    }
}