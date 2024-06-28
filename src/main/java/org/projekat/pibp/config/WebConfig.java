package org.projekat.pibp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Mapiranje na sve API putanje
                .allowedOrigins("http://localhost:3000")  // Dozvoljeni origin
                .allowedMethods("GET", "POST", "PUT", "DELETE");  // Dozvoljeni HTTP metodi
    }
}
