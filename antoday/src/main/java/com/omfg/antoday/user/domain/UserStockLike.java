package com.omfg.antoday.user.domain;

import com.omfg.antoday.stock.domain.Stock;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class UserStockLike {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userStockLikePk;

    @ManyToOne
    @JoinColumn(name = "social_id")
    private User user;


    @ManyToOne
    @JoinColumn(name = "stock_code")
    private Stock stock;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updated_At;

    @Builder
    public UserStockLike(long userStockLikePk, User user, Stock stock, LocalDateTime createdAt, LocalDateTime updated_At) {
        this.userStockLikePk = userStockLikePk;
        this.user = user;
        this.stock = stock;
        this.createdAt = createdAt;
        this.updated_At = updated_At;
    }
}
