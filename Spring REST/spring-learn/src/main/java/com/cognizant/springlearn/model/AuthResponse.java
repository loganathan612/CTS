package com.cognizant.springlearn.model;

/**
 * Response model for the authentication endpoint.
 * Jackson serializes this as: {"token":"<jwt-string>"}
 */
public class AuthResponse {

    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
