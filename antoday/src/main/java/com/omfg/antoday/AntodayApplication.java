package com.omfg.antoday;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class AntodayApplication {

    public static void main(String[] args) {
        SpringApplication.run(AntodayApplication.class, args);
    }

}
