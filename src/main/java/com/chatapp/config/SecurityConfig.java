package com.chatapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired 
    private JwtAuthenticationFilter jwtFilter;

    @Autowired
    private CustomAuthHandlers customAuthHandlers; 

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth 
             .requestMatchers("/api/meetings/**").permitAll() 
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/superadmin/**").hasAuthority("SUPER_ADMIN")
                .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                .requestMatchers("/api/itadmin/**").hasAuthority("IT_ADMIN")
                .anyRequest().authenticated()
            )
           
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(customAuthHandlers) 
                .accessDeniedHandler(customAuthHandlers)      
            )
          
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean 
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
