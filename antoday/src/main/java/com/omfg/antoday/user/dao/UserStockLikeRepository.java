package com.omfg.antoday.user.dao;

import com.omfg.antoday.user.domain.UserStockLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStockLikeRepository extends JpaRepository<UserStockLike, Long> {
}
