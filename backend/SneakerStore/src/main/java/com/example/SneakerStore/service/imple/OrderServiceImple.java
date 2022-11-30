package com.example.SneakerStore.service.imple;

import com.example.SneakerStore.dao.OrderDao;
import com.example.SneakerStore.dao.ShopingCartDao;
import com.example.SneakerStore.dao.SizeDao;
import com.example.SneakerStore.domain.OrderCart;
import com.example.SneakerStore.domain.ShopingCart;
import com.example.SneakerStore.domain.Size;
import com.example.SneakerStore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class OrderServiceImple implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private SizeDao sizeDao;


    @Autowired
    private ShopingCartDao shopingCartDao;


    @Transactional
    @Override
    public void increase(int cartId,long sizeId) {
        orderDao.increase(cartId, sizeId);
    }
    @Transactional
    @Override
    public void reduce(int cartId,long sizeId) {
        orderDao.decrease(cartId,sizeId);
    }

    @Override
    public String add(int cartId, long sizeId) {
        OrderCart oreder=new OrderCart();
        oreder.setQuantity(1);
        Size size = sizeDao.getOne(sizeId);
        ShopingCart cart = shopingCartDao.getOne(cartId);
        oreder.setSize(size);
        oreder.setCart(cart);
        orderDao.save(oreder);

        return "add";
    }

    @Transactional
    @Override
    public void deleteOrders(int cartId) {
        orderDao.removeAllByCart(cartId);
    }

}
