package com.example.SneakerStore.domain;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Table(name = "authority")
@Entity
public class Authority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "authorityId")
    private long id;
    @Column(name = "role")
    private String role;

    public Authority(long id, String role) {
        this.id=id;
        this.role = role;
    }

    public Authority() {
    }

    @Override
    public String getAuthority() {
        return this.role;
    }

    public long getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
