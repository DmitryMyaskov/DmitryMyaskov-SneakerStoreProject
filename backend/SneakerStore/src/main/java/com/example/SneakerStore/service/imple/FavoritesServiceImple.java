package com.example.SneakerStore.service.imple;

import com.example.SneakerStore.controller.mapper.ProductResource;
import com.example.SneakerStore.controller.model.ProductDTO;
import com.example.SneakerStore.dao.FavoritesDao;
import com.example.SneakerStore.dao.ProductDao;
import com.example.SneakerStore.dao.UserDao;
import com.example.SneakerStore.domain.Favorites;
import com.example.SneakerStore.domain.Product;
import com.example.SneakerStore.domain.User;
import com.example.SneakerStore.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
public class FavoritesServiceImple implements FavoritesService {
    @Autowired
    private ProductDao productDao;

    @Autowired
    private FavoritesDao favoritesDao;

    @Autowired
    private UserDao userDao;

    @Transactional
    @Override
    public void removeFavorit(Long userId, int prodId) {
        favoritesDao.deleteFavorites(userId,prodId);
    }


    @Transactional
    @Override
    public void addFarvorit(Long userId, int prodId) {
        Favorites favorites = new Favorites();
        Product product = productDao.getOne(prodId);
        User user = userDao.getOne(userId);
        favorites.setProduct(product);
        favorites.setUser(user);
        favoritesDao.save(favorites);
    }

    @Transactional
    @Override
    public List<ProductDTO> findAll(Long userId) {
        List<Favorites> favorites = favoritesDao.findAll(userId);
        List<ProductDTO> favoritesDTO = new ProductResource().mapFavoritesToProduct(favorites);

        return favoritesDTO;
    }
}
