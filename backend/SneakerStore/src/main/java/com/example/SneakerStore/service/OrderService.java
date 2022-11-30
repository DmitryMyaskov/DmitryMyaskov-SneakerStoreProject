package com.example.SneakerStore.service;



public interface OrderService {
    void increase(int cartId,long sizeId);
    void reduce(int cartId,long sizeId);
    String add(int cartId, long sizeId);
    void deleteOrders(int cartId);
}
