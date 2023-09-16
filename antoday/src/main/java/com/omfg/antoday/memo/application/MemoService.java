package com.omfg.antoday.memo.application;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.memo.dao.MemoRepository;
import com.omfg.antoday.memo.domain.Memo;
import com.omfg.antoday.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;

    @Transactional
    public void addMemo(User user) {
        Memo memo = Memo.builder()
                .user(user)
                .build();

        memoRepository.save(memo);
        log.info("[Memo] 메모가 생성되었습니다.");
    }

    private User getUserFromToken(UserDetailsImpl userDetails) {
        User user = userDetails.getUser();
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "[Token] 유효하지 않은 사용자입니다.");
        }
        return user;
    }
}
