package com.omfg.antoday.config.jwt;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String HEADER_STRING = "Authorization";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwtHeader = (request).getHeader(HEADER_STRING);

        // 토큰 없는 경우 로직 종료
        if(jwtHeader == null || !jwtHeader.startsWith(TOKEN_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Bearer 제거
        String token = jwtHeader.replace(TOKEN_PREFIX, "");

        // 사용자 인증
        try {
            Authentication authentication = jwtTokenProvider.authenticateToken(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("[Token 인증] 사용자 인증 성공");

        } catch (TokenExpiredException e) {
            e.printStackTrace();
            log.info("[Token 인증] 토큰이 만료되었습니다.");
            request.setAttribute(HEADER_STRING, "토큰이 만료되었습니다.");
        } catch (JWTVerificationException e) {
            e.printStackTrace();
            log.info("[Token 인증] 유효하지 않은 토큰입니다.");
            request.setAttribute(HEADER_STRING, "유효하지 않은 토큰입니다.");
        }
        filterChain.doFilter(request, response);
    }
}