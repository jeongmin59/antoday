package com.omfg.antoday.user.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.omfg.antoday.config.jwt.JwtTokenProvider;
import com.omfg.antoday.config.jwt.TokenDto;
import com.omfg.antoday.user.dao.UserRepository;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.dto.UserInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${kakao.client_id}")
    private String client_id;

    @Value("${kakao.redirect_uri}")
    private String redirect_uri;

    public Map<String, Object> kakaologin(String code) throws JsonProcessingException {
        // 인가 코드로 Access Token 요청
        String accessToken = getAccessToken(code);

        // Access Token으로 사용자 정보 가져오기
        UserInfoDto userInfoDto = getKakaoUserInfo(accessToken);

        // DB에 유저 저장
        User user = registerKakaoUserIfNeeded(userInfoDto);

        TokenDto tokenDto =  jwtTokenProvider.createToken(user);

        updateRefreshToken(tokenDto, userInfoDto.getSocialId());

        Map<String, Object> data = new HashMap<>();
        data.put("userName", user.getUserName());
        data.put("tokenInfo", tokenDto);

        return data;
    }

    // 인가 코드로 Access Token 요청
    private String getAccessToken(String code) throws JsonProcessingException {

        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", client_id);
        body.add("redirect_uri", redirect_uri);
        body.add("code", code);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // HTTP 응답 (JSON) -> AccessToken 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        return jsonNode.get("access_token").asText();
    }

    // Access Token으로 사용자 정보 가져오기
    private UserInfoDto getKakaoUserInfo(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        // 사용자 정보 가져오기
        Long socialId = jsonNode.get("id").asLong();
        String userName = jsonNode.get("properties")
                .get("nickname").asText();
        return new UserInfoDto(socialId, userName);
    }

    // 회원가입
    private User registerKakaoUserIfNeeded(UserInfoDto userInfoDto) {
        User user = userRepository.findBySocialId(userInfoDto.getSocialId())
                .orElse(null);

        if (user == null) { // DB에 해당 유저 정보 없을 경우에만 회원가입 진행(DB 저장)
            user = User.builder()
                    .socialId(userInfoDto.getSocialId())
                    .userName(userInfoDto.getUserName())
                    .build();
            userRepository.save(user);
        }
        return user;
    }

    private void updateRefreshToken(TokenDto tokenDto, Long socialId) {
        Optional<User> userOptional = userRepository.findBySocialId(socialId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.updateRefreshToken(tokenDto.getRefreshToken());
            userRepository.save(user);
        } else {
            throw new RuntimeException("일치하는 회원이 없습니다.");
        }
    }

    public void makeDummy() {
        userRepository.save(User.builder()
                .socialId(1L).userName("1")
                .build());
    }
}