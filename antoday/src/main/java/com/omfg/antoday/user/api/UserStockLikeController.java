package com.omfg.antoday.user.api;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.user.application.UserStockLikeService;
import com.omfg.antoday.user.dto.UserStockListResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userstock")
@Api(tags = "관심 기업 관련 API")
@RequiredArgsConstructor
public class UserStockLikeController {

    private final UserStockLikeService userStockLikeService;

    @PostMapping
    @ApiOperation(value = "관심 기업 등록", notes = "토큰, stockCode 필요" )
    public ResponseEntity<String> userStockAdd(@RequestParam String stockCode,
                                               @AuthenticationPrincipal UserDetailsImpl userDetails) {
        userStockLikeService.adduserStockLike(stockCode, userDetails);
        return new ResponseEntity<>("[Stock] 관심 기업으로 등록되었습니다.", HttpStatus.CREATED);
    }

    @GetMapping
    @ApiOperation(value = "관심 기업 조회", notes = "토큰, page 필요(0부터 시작)" )
    public ResponseEntity<?> userStockGet(@RequestParam(name = "page", defaultValue = "0") int page,
                                          @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Page<UserStockListResponseDto> userStockList = userStockLikeService.getUserStockList(page, userDetails);
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