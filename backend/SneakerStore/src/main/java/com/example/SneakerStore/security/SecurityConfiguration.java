package com.example.SneakerStore.security;

import com.example.SneakerStore.security.filter.JwtAuthentificationFilter;
import com.example.SneakerStore.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.HttpSessionEventPublisher;


@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomUserService customUserService;
    @Autowired
    private JwtTokenHelper jwtTokenHelper;
    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;


    @Override
    public void configure( HttpSecurity http ) throws Exception {

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
                .and().authorizeRequests().antMatchers("/auth/login").permitAll()
//                .and().authorizeRequests((req)->req.antMatchers( "/api/v1/auth/login","/api/v1/auth/check").permitAll().
//                antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .and().authorizeRequests().anyRequest().authenticated().and()
                .addFilterBefore(new JwtAuthentificationFilter(authenticationManagerBean(),customUserService,jwtTokenHelper), UsernamePasswordAuthenticationFilter.class);

        http.cors();



        http.csrf().disable().headers().frameOptions().disable();
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

    @SuppressWarnings("deprecation")
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configure( AuthenticationManagerBuilder auth ) throws Exception {
        auth.userDetailsService(customUserService).passwordEncoder(passwordEncoder());

    }
}
