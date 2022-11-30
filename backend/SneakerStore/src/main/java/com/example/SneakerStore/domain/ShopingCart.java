package com.example.SneakerStore.domain;

import javax.persistence.*;

@Entity
@Table(name = "shoping_cart")
public class ShopingCart {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    public ShopingCart() {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }



}
