package com.omfg.antoday.memo.dao;

import com.omfg.antoday.memo.domain.Memo;
import com.omfg.antoday.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Long> {
    Memo findByUser(User user);
}
