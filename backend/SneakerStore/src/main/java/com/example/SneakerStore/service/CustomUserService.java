package com.example.SneakerStore.service;

import com.example.SneakerStore.dao.ShopingCartDao;
import com.example.SneakerStore.dao.UserDao;
import com.example.SneakerStore.domain.ShopingCart;
import com.example.SneakerStore.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CustomUserService implements UserDetailsService {
    @Autowired
    private UserDao userDao;


    @Autowired
    private ShopingCartDao shopingCartDao;



    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userDao.findByUsername(s);

        if(user==null){
            throw new UsernameNotFoundException("user not found"+s);
        }
        return user;
    }
    @Transactional
    public void createCart(User user){
        ShopingCart cart = new ShopingCart();
        user.setCart(cart);
        shopingCartDao.save(cart);
    }

}
