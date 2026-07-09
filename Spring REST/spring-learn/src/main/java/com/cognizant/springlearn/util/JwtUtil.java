package com.cognizant.springlearn.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * Utility class responsible for generating JWT tokens.
 *
 * Uses JJWT 0.12.x API:
 * - Subject  → username
 * - IssuedAt → current timestamp
 * - Expiry   → current timestamp + configured expiration in ms
 * - Signed   → HMAC-SHA256 using app.jwt.secret key from application.properties
 */
@Component
public class JwtUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    /**
     * Generates a signed JWT token for the given username.
     *
     * @param username the authenticated user's username
     * @return compact JWT token string
     */
    public String generateToken(String username) {
        LOGGER.debug("Start: generateToken() for user: {}", username);

        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        String token = Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key)
                .compact();

        LOGGER.debug("End: generateToken() - token generated successfully");
        return token;
    }
}
