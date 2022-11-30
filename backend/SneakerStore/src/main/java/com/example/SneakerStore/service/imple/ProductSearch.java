package com.example.SneakerStore.service.imple;

import java.util.Set;

public class ProductSearch {
    private String search;
    private String minPrice;
    private String maxPrice;
    private Set<String> colors;
    private String sortedBy;
    private String status;
    private Set<String> productBrand;

    public ProductSearch(){}

    public ProductSearch fixBrand(Set<String> names){
        if(names==null){
            return this;
        }
        this.productBrand=names;
        return this;
    }

    public ProductSearch fixSorted(String sortedBy) {
        if(sortedBy==null) {
            return this;
        }
        this.sortedBy=sortedBy;
        return this;
    }

    public ProductSearch fixColor(Set<String> colors) {
        this.colors=colors;
        return this;
    }

    public ProductSearch fixPrice(String min, String max) {
        this.minPrice=min;
        this.maxPrice=max;
        return this;
    }

    public ProductSearch fixSearch(String searchValue) {
        this.search=searchValue;
        return this;
    }

    public ProductSearch fixStatus(String status){
        this.status=status;
        return this;
    }



    public String getSearch() {
        return search;
    }

    public String getMinPrice() {
        return minPrice;
    }

    public String getMaxPrice() {
        return maxPrice;
    }

    public Set<String> getColors() {
        return colors;
    }

    public String getSortedBy() {
        return sortedBy;
    }

    public String getStatus() {
        return status;
    }

    public Set<String> getProductBrand() {
        return productBrand;
    }
}
