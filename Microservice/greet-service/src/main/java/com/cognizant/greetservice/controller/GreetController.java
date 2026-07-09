package com.cognizant.greetservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for the Greet Microservice.
 *
 * Exposes:
 *   GET /greet → "Hello World"
 *
 * Sample Request : http://localhost:8082/greet
 * Via API Gateway: http://localhost:9090/greet-service/greet
 */
@RestController
public class GreetController {

    private static final Logger LOGGER = LoggerFactory.getLogger(GreetController.class);

    @GetMapping("/greet")
    public String greet() {
        LOGGER.debug("Start: greet()");
        String response = "Hello World";
        LOGGER.debug("End: greet() - returning: {}", response);
        return response;
    }
}
