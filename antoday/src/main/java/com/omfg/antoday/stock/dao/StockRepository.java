package com.omfg.antoday.stock.dao;

import com.omfg.antoday.stock.domain.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, String> {

    List<Stock> findAll();

    Page<Stock> findByCorpNameContainingOrderByCorpNameAsc(String keyword, PageRequest pageRequest);
}