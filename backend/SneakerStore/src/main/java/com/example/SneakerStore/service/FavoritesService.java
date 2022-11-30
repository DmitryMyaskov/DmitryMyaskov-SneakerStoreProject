package com.example.SneakerStore.service;


import com.example.SneakerStore.controller.model.ProductDTO;

import java.util.List;

public interface FavoritesService {
    void addFarvorit(Long userId, int prodId);
    void removeFavorit(Long userId, int prodId);
    List<ProductDTO> findAll(Long userId);
}
