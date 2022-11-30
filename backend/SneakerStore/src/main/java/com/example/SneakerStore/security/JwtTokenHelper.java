package com.example.SneakerStore.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenHelper {

    private final Logger log = LoggerFactory.getLogger(JwtTokenHelper.class);

    @Value("${jwt.auth.app}")
    private String appName;

    @Value("${jwt.auth.secret_key}")
    private String secrectKey;

    @Value("${jwt.auth.expires_in}")
    private int expiresIn;

    private SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

    public Claims getAllClaimsFromToken(String token){
        Claims claims;

        try {
            claims = Jwts.parser()
                    .setSigningKey(secrectKey)
//                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }catch (Exception e){
            claims=null;
        }

        return claims;
    }

    public String getUserNameFromToken(String token){
        String userName;
        try{
            final Claims claims = getAllClaimsFromToken(token);
            userName = claims.getSubject();
        }catch (Exception e){
            userName=null;
        }

        return userName;
    }


    public String generateToken(String userName, Collection<GrantedAuthority> authorities){
        String roles=authorities.stream().map(grantedAuthority -> grantedAuthority.getAuthority()).collect(Collectors.joining(","));
        return Jwts.builder()
                .setIssuer(appName)
                .setSubject(userName)
                .claim("auth",roles)
                .setIssuedAt(new Date())
                .setExpiration(generationExpiration())
                .signWith(SIGNATURE_ALGORITHM,secrectKey)
                .compact();
    }

    private Date generationExpiration(){
        return new Date(new Date().getTime()+expiresIn*1000);
    }

    public boolean isTokenExpirate(String token){
        Date date = getExpirationDate(token);
        return date.before(new Date());
    }

    private Date getExpirationDate(String token){
        Date expirateDate;
        try{
            final Claims claims = getAllClaimsFromToken(token);
            expirateDate=claims.getExpiration();
        }catch (Exception e){
            expirateDate=null;
        }
        return expirateDate;
    }

    public Authentication getAuthenticate(String token){
        Claims claims=Jwts.parser().setSigningKey(secrectKey).parseClaimsJws(token).getBody();
        Collection<GrantedAuthority> roles = Arrays.stream(claims.get("auth").toString().split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        User user = new User(claims.getSubject(),"",roles);

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(),token,user.getAuthorities());
        return  usernamePasswordAuthenticationToken;
    }

    public boolean validateToken(String authToken){
        try {
            Jwts.parser().setSigningKey(secrectKey).parseClaimsJws(authToken);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT signature.");
            log.trace("Invalid JWT signature trace: {}", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            log.trace("Expired JWT token trace: {}", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
            log.trace("Unsupported JWT token trace: {}", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
            log.trace("JWT token compact of handler are invalid trace: {}", e);
        }
        return false;
    }

//    public boolean validateToken(String token, UserDetails userDetails){

//        final String userName = getUserNameFromToken(token);
//        return userName!=null
//                && getUserNameFromToken(token).equals(userDetails.getUsername())
//                && !isTokenExpirate(token);
//    }

    public String getToken(HttpServletRequest httpServletRequest){
        String header = getAuthHeaderFromHeader(httpServletRequest);
        if(header!=null && header.startsWith("Bearer "))
            return header.substring(7);
        return null;
    }

    public String getAuthHeaderFromHeader(HttpServletRequest httpServletRequest){
        String headerName = httpServletRequest.getHeader("Authorization");
        return headerName;
    }
}
