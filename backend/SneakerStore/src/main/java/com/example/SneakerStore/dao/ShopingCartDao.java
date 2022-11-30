package com.example.SneakerStore.dao;

import com.example.SneakerStore.domain.ShopingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopingCartDao extends JpaRepository<ShopingCart, Integer> {


}
