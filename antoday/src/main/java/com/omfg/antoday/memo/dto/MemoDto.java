package com.omfg.antoday.memo.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemoDto {
    private Long memoPk;
    private String memo;
}
