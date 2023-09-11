package com.omfg.antoday.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class UserInfoDto {
    private Long socialId;
    private String userName;
    private String accessToken;
    private String refreshToken;
}