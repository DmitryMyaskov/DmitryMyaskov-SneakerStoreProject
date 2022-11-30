package com.example.SneakerStore.domain;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name="Product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name="product_id",unique = true)
    private int productid;

    @Column(name="brand",unique = true)
    private String brand;

    @Column(name="model",unique = true)
    private String modle;

    @Column(name="sale")
    private String sale;

    @Column(name="status")
    private String status;

    @Column(name = "price")
    private String price;

    @Column(name = "img")
    private String img;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "product",orphanRemoval = true)
    private Set<Size> sizes;


    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="brand_id")
    private Brand productBrand;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "product_color", inverseJoinColumns = @JoinColumn(name = "color_id"),
    joinColumns = @JoinColumn(name = "product_id"))
    private Set<Color> color;


    public int getProductid() {
        return productid;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModle() {
        return modle;
    }

    public void setModle(String modle) {
        this.modle = modle;
    }

    public String getPrice() {
        return price;
    }

    public void setProductid(int productid) {
        this.productid = productid;
    }

    public Set<Color> getColors() {
        return color;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;

        Product product = (Product) o;

        if (getProductid() != product.getProductid()) return false;
        if (!getPrice().equals(product.getPrice())) return false;
        return color.equals(product.color);
    }

    @Override
    public int hashCode() {
        int result = getProductid();
        result = 31 * result + getPrice().hashCode();
        return result;
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

    public Set<Size> getSizes() {
        return sizes;
    }

    public void setSizes(Set<Size> sizes) {
        this.sizes = sizes;
    }

    public Brand getProductBrand() {
        return productBrand;
    }

    public void setProductBrand(Brand productBrand) {
        this.productBrand = productBrand;
    }
}
