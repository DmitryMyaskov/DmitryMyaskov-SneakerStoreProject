package com.example.SneakerStore.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Table(name ="user")
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private long id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "enabled")
    private boolean enabled = true;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_authority",joinColumns ={ @JoinColumn(name = "user_id")}, inverseJoinColumns ={@JoinColumn(name = "authority_id")})
    private Set<Authority> authorities = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private ShopingCart cart;


    public User() {
    }

//    public User(Integer id, String username, String password, boolean enabled) {
//        this.id = id;
//        this.username = username;
//        this.password = password;
//        this.enabled = enabled;
//    }
//
//    public User(String username, String password, boolean enabled) {
//        this.username = username;
//        this.password = password;
//        this.enabled = enabled;
//    }

    public void addAuthority(Authority authority){
        authorities.add(authority);
    }


    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return authorities.stream().collect(Collectors.toList());
    }



    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.enabled;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setAuthorities(Collection<Authority> authorities) {
//        this.authorities = authorities;
    }

    public long getId() {
        return id;
    }


    public ShopingCart getCart() {
        return cart;
    }

    public void setCart(ShopingCart cart) {
        this.cart = cart;
    }
}



//@Table(name ="user")
//@Entity
//public class User implements UserDetails {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "userId")
//    private long id;
//    @Column(name = "username")
//    private String username;
//    @Column(name = "password")
//    private String password;
//    @Column(name = "enabled")
//    private boolean enabled = true;
//
//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
////    @JoinTable(name = "user_authority",joinColumns ={ @JoinColumn(name = "user_id")}, inverseJoinColumns ={@JoinColumn(name = "authority_id")})
//    private List<UserAuthority> authorities = new ArrayList<>();
//
//    @ManyToOne
//    @JoinColumn(name = "cart_id")
//    private ShopingCart cart;
//
//
//    public User() {
//    }
//
//    public User(Integer id, String username, String password, boolean enabled) {
//        this.id = id;
//        this.username = username;
//        this.password = password;
//        this.enabled = enabled;
//    }
//
//    public User(String username, String password, boolean enabled) {
//        this.username = username;
//        this.password = password;
//        this.enabled = enabled;
//    }
//
//    public void addAuthority(Authority authority){
//        UserAuthority userAuthority = new UserAuthority(this,authority);
//        authorities.add(userAuthority);
//    }
//
//
//    @Override
//    public Collection<GrantedAuthority> getAuthorities() {
//        return authorities.stream().map(a->a.getAuthority()).collect(Collectors.toList());
//    }
//
//
//
//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//    @Override
//    public String getUsername() {
//        return username;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return this.enabled;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return this.enabled;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return this.enabled;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return this.enabled;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public void setEnabled(boolean enabled) {
//        this.enabled = enabled;
//    }
//
//    public void setAuthorities(Collection<Authority> authorities) {
////        this.authorities = authorities;
//    }
//
//    public long getId() {
//        return id;
//    }
//
//
//    public ShopingCart getCart() {
//        return cart;
//    }
//
//    public void setCart(ShopingCart cart) {
//        this.cart = cart;
//    }
//}
