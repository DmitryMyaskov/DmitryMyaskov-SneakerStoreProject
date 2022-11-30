package com.example.SneakerStore.controller;

import com.example.SneakerStore.controller.model.OrderDto;
import com.example.SneakerStore.controller.model.ShopCartDto;
import com.example.SneakerStore.service.OrderService;
import com.example.SneakerStore.service.ShopingCartService;
import com.example.SneakerStore.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/cart/{cartId}")

public class ShopingCartController {

    @Autowired
    private ShopingCartService shopingCartService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private SizeService sizeService;


    @GetMapping("/remove/{sizeId}")
    public ResponseEntity remove(@PathVariable int sizeId,@PathVariable int cartId){
        shopingCartService.removeItem(cartId, sizeId);
        System.out.println("remove");
        return ResponseEntity.ok("removeController");
    }

    @GetMapping("/add/{sizeId}")
    public ResponseEntity add(@PathVariable int cartId, @PathVariable long sizeId){
        orderService.add(cartId,sizeId);
        System.out.println("add+");
        return ResponseEntity.ok("add+");
    }

    @GetMapping("/increase/{sizeId}")
    public ResponseEntity increase(@PathVariable int cartId, @PathVariable long sizeId){
//        System.out.println("prod"+prodId+":"+"cart"+cartId);
        orderService.increase(cartId,sizeId);
        System.out.println("add");
        return ResponseEntity.ok("add");
    }


    @GetMapping("/reduce/{sizeId}")
    public ResponseEntity reduce(@PathVariable int cartId, @PathVariable long sizeId){
        orderService.reduce(cartId,sizeId);
        System.out.println("-");
        return ResponseEntity.ok("-");
    }

    @GetMapping
    public ResponseEntity showCart(@PathVariable int cartId){
        ShopCartDto cart = shopingCartService.showCart(cartId);
        System.out.println("show");
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/order")
    public ResponseEntity order(@RequestBody OrderDto orderDto){
        String status=sizeService.dec(orderDto);
//        String status = orderService.decOrder(cartId,sizeId,count);
        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/clear")
    public ResponseEntity clear(@PathVariable int cartId){
        orderService.deleteOrders(cartId);
        return ResponseEntity.ok("clearOrders");
    }




}
