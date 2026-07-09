package com.cognizant.springlearn.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security configuration.
 *
 * - Permits /authenticate endpoint without any credentials check
 *   (credentials are read and validated manually inside AuthController).
 * - Disables CSRF (stateless REST API).
 * - Uses STATELESS session management (no HTTP session created).
 * - Enables HTTP Basic so Spring automatically parses the Authorization header.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);

    /**
     * In-memory user store with a single user: user / pwd.
     */
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        LOGGER.debug("Configuring in-memory UserDetailsService");
        UserDetails user = User.builder()
                .username("user")
                .password(encoder.encode("pwd"))
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(user);
    }

    /**
     * BCrypt password encoder bean.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Security filter chain:
     * - /authenticate → open (no auth required)
     * - Everything else → requires authentication
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        LOGGER.debug("Configuring SecurityFilterChain");
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/authenticate").permitAll()
                .anyRequest().authenticated())
            .httpBasic(basic -> {});   // enables Authorization: Basic header parsing

        return http.build();
    }
}
