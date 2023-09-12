package com.omfg.antoday.memo.domain;

import com.omfg.antoday.user.domain.User;
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
public class Memo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memoPk;

    @OneToOne
    @JoinColumn(name = "social_id")
    private User user;

    @Column(columnDefinition = "TEXT")
    private String memo;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public Memo(User user, String memo, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.user = user;
        this.memo = memo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
