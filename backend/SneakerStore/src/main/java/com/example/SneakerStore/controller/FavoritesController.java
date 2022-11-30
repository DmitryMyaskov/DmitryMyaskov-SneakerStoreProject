package com.example.SneakerStore.controller;

import com.example.SneakerStore.controller.model.ProductDTO;
import com.example.SneakerStore.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin
@RequestMapping("user/{userId}/favorites")
@RestController
public class FavoritesController {
    @Autowired
    private FavoritesService favoritesService;


    @PutMapping("/add/{prodId}")
    public ResponseEntity addFavorites(@PathVariable int prodId,@PathVariable Long userId){
        favoritesService.addFarvorit(userId,prodId);

        return ResponseEntity.ok("ok");
    }

    @GetMapping("/list")
    public ResponseEntity findAll(@PathVariable Long userId){
        List<ProductDTO> fDTO = favoritesService.findAll(userId);

        System.out.println("fav list");
        return ResponseEntity.ok(fDTO);
    }

    @DeleteMapping("/delete/{prodId}")
    public ResponseEntity deleteFavorites(@PathVariable int prodId,@PathVariable Long userId){
        favoritesService.removeFavorit(userId, prodId);
        return ResponseEntity.ok("ok");
    }

}
