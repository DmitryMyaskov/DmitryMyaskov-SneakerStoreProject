package com.example.SneakerStore.controller.mapper;



import com.example.SneakerStore.controller.model.ProductDTO;
import com.example.SneakerStore.controller.model.SizeDTO;
import com.example.SneakerStore.domain.Favorites;
import com.example.SneakerStore.domain.OrderCart;
import com.example.SneakerStore.domain.Product;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

public class ProductResource{

    public List<ProductDTO> map(List<Product> product) {
        return product.stream().map(product1 -> {
            ProductDTO pr = new ProductDTO();
            pr.setProductId(product1.getProductid());
            pr.setBrand(product1.getBrand());
            pr.setModel(product1.getModle());
            pr.setPrice(product1.getPrice());

            pr.setColors(product1.getColors().stream().map(color -> color.getName()).collect(Collectors.toSet()));

            Set<SizeDTO> sizeDTOS= new TreeSet<>(Comparator.comparing(SizeDTO::getSize));
            sizeDTOS.addAll(product1.getSizes().stream().map(size-> new SizeDTO(size.getId(),size.getSize(),size.getQuantity())).collect(Collectors.toSet()));
            pr.setSizes(sizeDTOS);

            pr.setImg(product1.getImg());
            pr.setSale(product1.getSale());
            pr.setStatus(product1.getStatus());
            return pr;
        }).collect(Collectors.toList());

    }



    public List<ProductDTO> mapOrederToProduct(List<OrderCart> orderCarts) {
        return orderCarts.stream().map(oreder-> {
            ProductDTO pr = new ProductDTO();
            pr.setProductId(oreder.getSize().getProduct().getProductid());
            pr.setBrand(oreder.getSize().getProduct().getBrand());
            pr.setModel(oreder.getSize().getProduct().getModle());
            pr.setPrice(oreder.getSize().getProduct().getPrice());
            pr.setImg(oreder.getSize().getProduct().getImg());
            pr.setSale(oreder.getSize().getProduct().getSale());
            pr.setOrderid(oreder.getId());
            pr.setQuantity(oreder.getQuantity());
            pr.setStatus(oreder.getSize().getProduct().getStatus());
            pr.setSelectSize(new SizeDTO(oreder.getSize().getId(),oreder.getSize().getSize(),oreder.getSize().getQuantity()));


            return pr;
        }).collect(Collectors.toList());
    }


    public List<ProductDTO> mapFavoritesToProduct(List<Favorites> favorites) {
        return favorites.stream().map(f-> {
            ProductDTO pr = new ProductDTO();
            pr.setProductId(f.getProduct().getProductid());
            pr.setBrand(f.getProduct().getBrand());
            pr.setModel(f.getProduct().getModle());
            pr.setPrice(f.getProduct().getPrice());
            pr.setImg(f.getProduct().getImg());
            pr.setSale(f.getProduct().getSale());
            pr.setStatus(f.getProduct().getStatus());
            return pr;
        }).collect(Collectors.toList());
    }


}
