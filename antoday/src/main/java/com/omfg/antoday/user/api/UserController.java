package com.omfg.antoday.user.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.omfg.antoday.user.application.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user/login")
    public ResponseEntity<Object> userLogin(@RequestParam String code) throws JsonProcessingException {
        Map<String, Object> data = userService.kakaologin(code);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/user/makedummy")
    public ResponseEntity<Object> makeDummy() {
        userService.makeDummy();
        return new ResponseEntity<>(0, HttpStatus.OK);
    }
}