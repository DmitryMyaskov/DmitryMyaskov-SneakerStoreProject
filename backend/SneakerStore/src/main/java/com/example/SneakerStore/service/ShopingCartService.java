package com.example.SneakerStore.service;


import com.example.SneakerStore.controller.model.ShopCartDto;

public interface ShopingCartService {
    void removeItem(int id,long sizeId);
    ShopCartDto showCart(int cartId);
}
