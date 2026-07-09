package com.cognizant.apigateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Spring Cloud API Gateway — routes all traffic to downstream microservices.
 *
 * - Registered with Eureka for service discovery
 * - Uses discovery-based routing: http://localhost:9090/{service-name}/{path}
 * - Applies LogFilter to log all incoming request paths
 */
@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApiGatewayApplication.class);

    public static void main(String[] args) {
        LOGGER.info("Starting API Gateway...");
        SpringApplication.run(ApiGatewayApplication.class, args);
        LOGGER.info("API Gateway started on port 9090");
    }
}
