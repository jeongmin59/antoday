package com.omfg.antoday.memo.application;

import com.omfg.antoday.config.UserDetailsImpl;
import com.omfg.antoday.memo.dao.MemoRepository;
import com.omfg.antoday.memo.domain.Memo;
import com.omfg.antoday.memo.dto.MemoDto;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.utils.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public MemoDto getMemo(UserDetailsImpl userDetails) {
        User user = UserUtils.getUserFromToken(userDetails);
        Memo memo = memoRepository.findByUser(user);

        log.info("[Memo] " +  user.getUserName() + "님의 메모가 조회되었습니다.");
        return MemoDto.builder()
                .memoPk(memo.getMemoPk())
                .memo(memo.getMemo())
                .build();
    }

    @Transactional
    public void updateMemo(String updatedMemo, UserDetailsImpl userDetails) {
        User user = UserUtils.getUserFromToken(userDetails);
        Memo memo = memoRepository.findByUser(user);

        if (memo != null) {
            memo.setMemo(updatedMemo);
            memoRepository.save(memo);
        } else {
            // 기존 메모가 없다면 새로운 메모를 생성 후 저장
            Memo newMemo = Memo.builder()
                    .user(user)
                    .memo(updatedMemo)
                    .build();

            memoRepository.save(newMemo);
        }
        log.info("[Memo] 메모가 수정되었습니다.");
    }
}
