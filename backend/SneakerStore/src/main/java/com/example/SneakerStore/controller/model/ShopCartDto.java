package com.example.SneakerStore.controller.model;


import java.io.Serializable;
import java.util.List;

public class ShopCartDto implements Serializable {
    private int id;
    private List<ProductDTO> products;

    public ShopCartDto(int id) {
        this.id = id;
    }

    public ShopCartDto(int id, List<ProductDTO> products) {
        this.id = id;
        this.products = products;
    }

    public ShopCartDto() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }
}
