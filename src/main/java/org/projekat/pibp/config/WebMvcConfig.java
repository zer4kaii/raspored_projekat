package org.projekat.pibp.config;

import org.projekat.pibp.interceptor.AdminInterceptor;
import org.projekat.pibp.interceptor.UserInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AdminInterceptor())
                .addPathPatterns("/admin/**");
        registry.addInterceptor(new UserInterceptor())
                .addPathPatterns("/user/**");// Apply the interceptor to URLs starting with /admin
    }
}
