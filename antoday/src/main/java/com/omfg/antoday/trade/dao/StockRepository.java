package com.omfg.antoday.trade.dao;

import com.omfg.antoday.stock.domain.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

// stock dummy 만들기 위함
public interface StockRepository extends JpaRepository<Stock,Long> {
}
