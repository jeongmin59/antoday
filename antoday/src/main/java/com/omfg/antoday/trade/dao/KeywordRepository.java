package com.omfg.antoday.trade.dao;

import com.omfg.antoday.trade.domain.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword,String> {
}
