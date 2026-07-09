package com.cognizant.apigateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * Global filter that intercepts and logs all incoming requests to the API Gateway.
 *
 * This filter runs before every request is forwarded to a downstream microservice.
 * It logs the full request URI and the HTTP method.
 *
 * Example log output for http://localhost:9090/greet-service/greet:
 *   INFO LogFilter - Incoming Request: GET -> /greet-service/greet
 */
@Component
public class LogFilter implements GlobalFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(LogFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String method = exchange.getRequest().getMethod().name();
        String path   = exchange.getRequest().getPath().toString();

        LOGGER.info("Incoming Request: {} -> {}", method, path);

        // Continue the filter chain — forward request to the downstream service
        return chain.filter(exchange);
    }
}
