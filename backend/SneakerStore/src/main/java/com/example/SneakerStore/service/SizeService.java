package com.example.SneakerStore.service;


import com.example.SneakerStore.controller.model.OrderDto;

public interface SizeService {
    String inc(Long sizeId, int count);
    String dec(OrderDto orderDto);
}
