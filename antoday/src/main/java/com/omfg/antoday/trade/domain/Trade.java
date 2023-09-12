package com.omfg.antoday.trade.domain;

import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.user.domain.User;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
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

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(columnDefinition = "TEXT")
    private String aiAnalyze;

    @UpdateTimestamp
    private LocalDateTime updated_at;

    @Column(columnDefinition = "TINYINT")
    @ColumnDefault("0")
    private boolean isDeleted;

    @Builder
    public Trade(Long tradePk, User user, Stock stock, LocalDateTime tradeAt, int price, int cnt, String reason, String aiAnalyze, LocalDateTime updated_at, boolean isDeleted) {
        this.tradePk = tradePk;
        this.user = user;
        this.stock = stock;
        this.tradeAt = tradeAt;
        this.price = price;
        this.cnt = cnt;
        this.reason = reason;
        this.aiAnalyze = aiAnalyze;
        this.updated_at = updated_at;
        this.isDeleted = isDeleted;
    }
}
