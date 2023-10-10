package com.omfg.antoday.trade.domain;

import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.trade.dto.TradeRequestDto;
import com.omfg.antoday.user.domain.User;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@ToString
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tradePk;

    @ManyToOne
    @JoinColumn(name = "social_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "stock_code")
    private Stock stock;

    @NotNull
    private LocalDateTime tradeAt;

    @NotNull
    private int price;

    @NotNull
    private int cnt;

    @Column(columnDefinition = "TINYINT")
    @NotNull
    private byte optionBuySell;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(columnDefinition = "TEXT")
    private String aiAnalyze;

    @UpdateTimestamp
    private LocalDateTime updated_at;

    @Column(columnDefinition = "TINYINT")
    @ColumnDefault("0")
    private boolean isDeleted;


    @OneToMany(mappedBy = "trade",
            fetch = FetchType.LAZY,
            cascade = CascadeType.PERSIST,
            orphanRemoval = true)
    private Set<TradeKeyword> keywords;

    @Builder
    public Trade(Long tradePk, User user, Stock stock, LocalDateTime tradeAt, int price, int cnt, byte optionBuySell, String reason, String aiAnalyze, LocalDateTime updated_at, boolean isDeleted, Set<TradeKeyword> keywords) {
        this.tradePk = tradePk;
        this.user = user;
        this.stock = stock;
        this.tradeAt = tradeAt;
        this.price = price;
        this.cnt = cnt;
        this.optionBuySell = optionBuySell;
        this.reason = reason;
        this.aiAnalyze = aiAnalyze;
        this.updated_at = updated_at;
        this.isDeleted = isDeleted;
        this.keywords = keywords;
    }

    public void setKeyWords(Set<TradeKeyword> set) {
        if(keywords == null) keywords = new HashSet<>();
        keywords.clear();
        keywords.addAll(set);
    }
    public void addKeyword(TradeKeyword t) {
        if(keywords == null) keywords = new HashSet<>();
        keywords.add(t);
    }
    public void update(TradeRequestDto dto ) {
        this.cnt = dto.getCnt();
        this.price = dto.getPrice();
        this.tradeAt = dto.getTradeAt();
        this.keywords.clear();
        this.reason = dto.getReason();
        this.aiAnalyze = null;
        this.optionBuySell = dto.getOptionBuySell();
        this.stock = Stock.builder().stockCode(dto.getStockCode()).build();
    }

    public int getCntByOption() {
        if(this.optionBuySell == 0) return this.cnt;
        else return this.cnt*-1;
    }

}
