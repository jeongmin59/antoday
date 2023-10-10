package com.omfg.antoday.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class UserInfoDto {
    private Long socialId;
    private String userName;

//    @Builder
//    public UserInfoDto(Long socialId, String userName) {
//        this.socialId = socialId;
//        this.userName = userName;
//    }
}