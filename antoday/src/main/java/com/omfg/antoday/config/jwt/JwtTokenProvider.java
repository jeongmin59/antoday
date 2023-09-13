package com.omfg.antoday.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.omfg.antoday.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${jwt.secretKey}")
    private String SECRET_KEY;
    private static final Long ACCESS_EXPIRATION_TIME = 10 * 24 * 60 * 60 * 1000L; // 10일
    private static final Long REFRESH_EXPIRATION_TIME = 14 * 24 * 60 * 60 * 1000L; // 14일

    public TokenDto createToken(User user) {
        // AccessToken 생성
        String accessToken = JWT.create()
                .withSubject(user.getUserName() + "JWTToken")
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION_TIME))

                .withClaim("socialId", user.getSocialId())
                .sign(Algorithm.HMAC512(SECRET_KEY));

        // RefreshToken 생성
        String refreshToken = JWT.create()
                .withSubject(user.getUserName() + "JWTToken")
                .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION_TIME))

                .withClaim("socialId", user.getSocialId())
                .sign(Algorithm.HMAC512(SECRET_KEY));

        log.info("[User] 로그인 성공");

        return TokenDto.builder()
                .accessToken(accessToken)
                .accessTokenExpiresIn(REFRESH_EXPIRATION_TIME)
                .refreshToken(refreshToken)
                .build();
    }
}