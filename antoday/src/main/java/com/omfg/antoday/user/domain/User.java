package com.omfg.antoday.user.domain;

import com.omfg.antoday.stock.domain.Stock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class User {

    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long socialId;

    private String userPw;

    private String userName;

    private String refreshToken;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public User(Long socialId, String userPw, String userName, String refreshToken) {
        this.socialId = socialId;
        this.userPw = userPw;
        this.userName = userName;
        this.refreshToken = refreshToken;
    }

    public void updateRefreshToken(String updatedRefreshToken) {
        this.refreshToken = updatedRefreshToken;
    }
}