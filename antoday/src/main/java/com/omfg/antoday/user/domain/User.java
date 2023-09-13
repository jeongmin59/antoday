package com.omfg.antoday.user.domain;

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
public class User {

    @Id
    private Long socialId;

    private String userName;

    private String refreshToken;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public User(Long socialId, String userName, String refreshToken) {
        this.socialId = socialId;
        this.userName = userName;
        this.refreshToken = refreshToken;
    }

    public void updateRefreshToken(String updatedRefreshToken) {
        this.refreshToken = updatedRefreshToken;
    }
}