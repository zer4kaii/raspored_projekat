package org.projekat.pibp.dto;

import lombok.Data;

import java.util.List;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";
    private List<String> authorities;
    private String username;
    public AuthResponseDTO(String accessToken, List<String> authorities, String username) {
        this.accessToken = accessToken;
        this.authorities = authorities;
        this.username = username;
    }
}
