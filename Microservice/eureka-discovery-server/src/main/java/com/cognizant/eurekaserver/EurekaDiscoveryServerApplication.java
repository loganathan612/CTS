package com.cognizant.eurekaserver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * Eureka Discovery Server — central service registry.
 *
 * All microservices (account, loan, greet-service, api-gateway) register
 * themselves here on startup. The dashboard is accessible at:
 *   http://localhost:8761
 */
@SpringBootApplication
@EnableEurekaServer
public class EurekaDiscoveryServerApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(EurekaDiscoveryServerApplication.class);

    public static void main(String[] args) {
        LOGGER.info("Starting Eureka Discovery Server...");
        SpringApplication.run(EurekaDiscoveryServerApplication.class, args);
        LOGGER.info("Eureka Discovery Server started. Dashboard: http://localhost:8761");
    }
}
