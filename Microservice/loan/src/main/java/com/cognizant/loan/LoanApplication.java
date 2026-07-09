package com.cognizant.loan;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LoanApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoanApplication.class);

    public static void main(String[] args) {
        LOGGER.info("Starting Loan Microservice...");
        SpringApplication.run(LoanApplication.class, args);
        LOGGER.info("Loan Microservice started successfully on port 8081");
    }
}
