package com.bookstore.config;

import com.bookstore.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> {})
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/login", "/api/auth/register", "/api/auth/google-login", "/api/auth/verify-otp", "/api/auth/forgot-password").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/books").permitAll()
                
                // Protected endpoints
                .requestMatchers("/api/auth/refresh").authenticated()
                .requestMatchers("/api/auth/profile").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/orders").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/orders").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/books/*/reviews").authenticated()
                
                // Admin endpoints
                .requestMatchers(HttpMethod.POST, "/api/books").hasAnyRole("ADMIN", "SUPERADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/books/*").hasAnyRole("ADMIN", "SUPERADMIN")
                .requestMatchers("/api/users/**").hasAnyRole("ADMIN", "SUPERADMIN")
                
                // Permit anything else for ease of development, but secure the sensitive ones above
                .anyRequest().permitAll()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
