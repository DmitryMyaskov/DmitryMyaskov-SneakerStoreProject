package com.example.SneakerStore.controller.model;


import java.io.Serializable;
import java.util.List;

public class OrderDto implements Serializable {
    private int id;
    private List<SizeDTO> products;

    public OrderDto(int id, List<SizeDTO> products) {
        this.id = id;
        this.products = products;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<SizeDTO> getProducts() {
        return products;
    }

    public void setProducts(List<SizeDTO> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "OrderDto{" +
                "id=" + id +
                ", products=" + products +
                '}';
    }
}
