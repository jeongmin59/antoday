package com.omfg.antoday.config.jwt;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final String HEADER_STRING = "Authorization";

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {  // JWT 인증 과정에서 401 Error 발생시 호출
        String exception = (String) request.getAttribute(HEADER_STRING);
        String errorCode;

        if (exception == null) {
            errorCode = "[Token] Header에 토큰 없음";
            setResponse(response, errorCode);
        } else if (exception.equals("토큰이 만료되었습니다.")) {
            errorCode = "[Token] 토큰이 만료되었습니다.";
            setResponse(response, errorCode);
        } else if (exception.equals("유효하지 않은 토큰입니다.")) {
            errorCode = "[Token] 유효하지 않은 토큰입니다.";
            setResponse(response, errorCode);
        }
    }

    private void setResponse(HttpServletResponse response, String errorCode) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().println(HEADER_STRING + " : " + errorCode);
    }
}