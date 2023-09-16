package com.omfg.antoday.memo.api;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.memo.application.MemoService;
import com.omfg.antoday.memo.dto.MemoDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/memo")
@Api(tags = "Memo 관련 API")
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;

    @GetMapping
    @ApiOperation(value = "메모 조회", notes = "토큰 필요")
    public ResponseEntity<MemoDto> memoGet(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        MemoDto memoDto = memoService.getMemo(userDetails);
        return new ResponseEntity<>(memoDto, HttpStatus.OK);
    }

    @PutMapping
    @ApiOperation(value = "메모 작성", notes = "토큰 필요/memo 필요")
    public ResponseEntity<String> memoModify(@RequestParam String memo,
                                             @AuthenticationPrincipal UserDetailsImpl userDetails) {
        memoService.updateMemo(memo, userDetails);
        return new ResponseEntity<>("[Memo] 메모가 저장되었습니다.", HttpStatus.CREATED);
    }
}
