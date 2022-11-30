package com.example.SneakerStore.controller.model;

import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public class UserDTO implements Serializable {
    private Long id;
    private String login;
    private String password;
    private Collection<GrantedAuthority> authorities;
    private String jwt;

    private ShopCartDto shopCartDto;

    private List<ProductDTO> favoritesDTOS;

    public UserDTO(Long id, String login, String password, Collection<GrantedAuthority> authorities) {
        this.id=id;
        this.login = login;
        this.password = password;
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }


    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }


    public ShopCartDto getShopCartDto() {
        return shopCartDto;
    }

    public void setShopCartDto(ShopCartDto shopCartDto) {
        this.shopCartDto = shopCartDto;
    }

    public List<ProductDTO> getFavoritesDTOS() {
        return favoritesDTOS;
    }

    public void setFavoritesDTOS(List<ProductDTO> favoritesDTOS) {
        this.favoritesDTOS = favoritesDTOS;
    }

}
