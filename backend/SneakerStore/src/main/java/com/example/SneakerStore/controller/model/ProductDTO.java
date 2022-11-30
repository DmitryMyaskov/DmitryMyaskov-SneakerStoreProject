package com.example.SneakerStore.controller.model;

import java.util.Set;


public class ProductDTO {
    private int productId;
    private int orderid;
    private String brand;
    private String model;
    private String price;
    private Set<String> colors;
    private Set<SizeDTO> sizes;
    private SizeDTO selectSize;

    private String img;
    private int quantity;
    private String sale;
    private String status;

    public ProductDTO(){}

    public Set<SizeDTO> getSizes() {
        return sizes;
    }

    public void setSizes(Set<SizeDTO> sizes) {
        this.sizes = sizes;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Set<String> getColors() {
        return colors;
    }

    public void setColors(Set<String> productColors) {
        this.colors = productColors;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getSale() {
        return sale;
    }

    public void setSale(String sale) {
        this.sale = sale;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }



    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }


    public SizeDTO getSelectSize() {
        return selectSize;
    }

    public void setSelectSize(SizeDTO selectSize) {
        this.selectSize = selectSize;
    }


    @Override
    public String toString() {
        return "ProductDTO{" +
                "productId=" + productId +
                '}';
    }
}
