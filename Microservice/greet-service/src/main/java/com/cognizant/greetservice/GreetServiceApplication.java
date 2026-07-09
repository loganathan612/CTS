package com.cognizant.greetservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Greet Microservice — registers with Eureka Discovery Server.
 * Exposes GET /greet returning "Hello World".
 */
@SpringBootApplication
@EnableDiscoveryClient
public class GreetServiceApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(GreetServiceApplication.class);

    public static void main(String[] args) {
        LOGGER.info("Starting Greet Microservice...");
        SpringApplication.run(GreetServiceApplication.class, args);
        LOGGER.info("Greet Microservice started on port 8082");
    }
}
