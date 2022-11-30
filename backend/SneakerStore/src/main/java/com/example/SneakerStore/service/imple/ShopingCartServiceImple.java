package com.example.SneakerStore.service.imple;

import com.example.SneakerStore.controller.mapper.ProductResource;
import com.example.SneakerStore.controller.model.ProductDTO;
import com.example.SneakerStore.controller.model.ShopCartDto;
import com.example.SneakerStore.dao.OrderDao;
import com.example.SneakerStore.service.ShopingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@Service
public class ShopingCartServiceImple implements ShopingCartService {

    @Autowired
    private OrderDao orderDao;


    @Transactional
    @Override
    public void removeItem(int cartId,long sizeId){
        orderDao.removeOrder(cartId,sizeId);
    }

    @Transactional
    @Override
    public ShopCartDto showCart(int cartId){
        List<ProductDTO> products = new ProductResource().mapOrederToProduct(orderDao.findOrders(cartId));
        ShopCartDto shopCartDto = new ShopCartDto(cartId);
        shopCartDto.setProducts(products);
        return shopCartDto;
    }


}
