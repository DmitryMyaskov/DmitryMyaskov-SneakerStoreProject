package com.example.SneakerStore.dao;

import com.example.SneakerStore.domain.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritesDao extends JpaRepository<Favorites, Integer> {
    @Query("select f from Favorites f left join fetch f.product where f.user.id=?1")
    List<Favorites> findAll(Long userId);

    @Modifying
    @Query("delete from Favorites f where f.user.id=?1 and f.product.productid=?2")
    void deleteFavorites(Long userId, int prodId);
}
