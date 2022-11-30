package com.example.SneakerStore.security.filter;

import com.example.SneakerStore.security.JwtTokenHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class  JwtAuthentificationFilter extends GenericFilterBean {
    private final Logger log = LoggerFactory.getLogger(JwtAuthentificationFilter.class);
    private UserDetailsService userDetailsService;
    private JwtTokenHelper jwtTokenHelper;
    private AuthenticationManager authenticationManager;

    public JwtAuthentificationFilter(AuthenticationManager authenticationManager,UserDetailsService userDetailsService, JwtTokenHelper jwtTokenHelper){
        this.userDetailsService= userDetailsService;
        this.jwtTokenHelper = jwtTokenHelper;
        this.authenticationManager = authenticationManager;
    }


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String requestURI = ((HttpServletRequest)servletRequest).getRequestURI();
        String authToken;
        authToken = jwtTokenHelper.getToken((HttpServletRequest) servletRequest);
        if(authToken!=null){
            if(jwtTokenHelper.validateToken(authToken)){
                Authentication authentication = jwtTokenHelper.getAuthenticate(authToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.trace("set Authentication to security context for '{}', uri: {}", authentication.getName(), requestURI);
            }else{
                log.trace("no valid JWT token found, uri: {}", requestURI);

            }
        }

        filterChain.doFilter(servletRequest,servletResponse);
    }
}
