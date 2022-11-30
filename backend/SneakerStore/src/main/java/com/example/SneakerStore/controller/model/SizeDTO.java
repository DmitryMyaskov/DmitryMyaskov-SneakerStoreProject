package com.example.SneakerStore.controller.model;

import java.io.Serializable;

public class SizeDTO implements Serializable {
    private Long id;
    private String size;
    private int quantity;
    private int stock;


    public SizeDTO(Long id, String size, int quantity) {
        this.id = id;
        this.size = size;
        this.quantity = quantity;
    }

    public SizeDTO(Long id, String size, int quantity, int stock) {
        this.id = id;
        this.size = size;
        this.quantity = quantity;
        this.stock=stock;
    }

    public SizeDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    @Override
    public String toString() {
        return "SizeDTO{" +
                "id=" + id +
                ", size='" + size + '\'' +
                ", quantity=" + quantity +
                ", stock=" + stock +
                '}';
    }
}
