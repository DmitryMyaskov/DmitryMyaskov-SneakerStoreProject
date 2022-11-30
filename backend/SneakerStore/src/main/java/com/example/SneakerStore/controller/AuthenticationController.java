package com.example.SneakerStore.controller;

import com.example.SneakerStore.controller.model.FormReq;
import com.example.SneakerStore.controller.model.UserDTO;
import com.example.SneakerStore.domain.User;
import com.example.SneakerStore.security.JwtTokenHelper;
import com.example.SneakerStore.service.CustomUserService;
import com.example.SneakerStore.service.FavoritesService;
import com.example.SneakerStore.service.ShopingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserService customUserService;

    @Autowired
    private FavoritesService favoritesService;

    @Autowired
    private ShopingCartService shopingCartService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody FormReq formReq){
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(formReq.getUsername(),formReq.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        UserDTO userDTO = new UserDTO(user.getId(),user.getUsername(),user.getPassword(),user.getAuthorities());
        if(user.getCart()==null) {
            customUserService.createCart(user);
        }
        userDTO.setShopCartDto(shopingCartService.showCart(user.getCart().getId()));
        userDTO.setFavoritesDTOS(favoritesService.findAll(user.getId()));

        String token = jwtTokenHelper.generateToken(user.getUsername(),user.getAuthorities());
        userDTO.setJwt(token);
        System.out.println("login");
        return ResponseEntity.ok(userDTO);
    }

}
