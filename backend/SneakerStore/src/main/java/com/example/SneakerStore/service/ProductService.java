package com.example.SneakerStore.service;

import com.example.SneakerStore.service.imple.ProductSearch;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface ProductService {
    Map<String, Object> searchAll(ProductSearch productSearch, Pageable pageable);

}
