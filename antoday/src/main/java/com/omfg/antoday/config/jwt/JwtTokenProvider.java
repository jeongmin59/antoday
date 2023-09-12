package com.omfg.antoday.config.jwt;

import com.omfg.antoday.user.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {
    @Value("${jwt.secretKey}")
    private String secretKey;

    private static final Long accessTokenValidTime = 10 * 24 * 60 * 60 * 1000L; // 10일
    private static final Long refreshTokenValidTime = 14 * 24 * 60 * 60 * 1000L; // 14일

    String TOKEN_PREFIX = "Bearer ";

    @Value("${jwt.access.header}")
    String HEADER_STRING;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public TokenDto createToken(User user) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");

        Claims claims = Jwts.claims().setSubject(String.valueOf(user.getSocialId()));
        claims.put("userName", user.getUserName());
        Date now = new Date();

        // AccessToken 생성
        String accessToken = Jwts.builder()
                .setHeader(headers)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        // RefreshToken 생성
        String refreshToken = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return TokenDto.builder()
                .accessToken(accessToken)
                .accessTokenExpiresIn(accessTokenValidTime)
                .refreshToken(refreshToken)
                .build();
    }
}