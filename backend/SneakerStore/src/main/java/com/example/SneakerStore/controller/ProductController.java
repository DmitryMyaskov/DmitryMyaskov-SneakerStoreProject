package com.example.SneakerStore.controller;

import com.example.SneakerStore.controller.mapper.ProductResource;
import com.example.SneakerStore.controller.model.ProductDTO;
import com.example.SneakerStore.domain.Product;
import com.example.SneakerStore.service.imple.ProductSearch;
import com.example.SneakerStore.service.imple.ProductServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(value = "/product", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*",allowedHeaders ="*")
public class ProductController {
    @Autowired
    private ProductServiceImple productServiceImple;


    @CrossOrigin(origins = "*",exposedHeaders = "x-total-count")
    @GetMapping("/search")
    public ResponseEntity<?> serchProduct(@RequestParam(name="search", required = false)
                                                      String serchValue,
                                          @RequestParam(name="page",required = false)
                                                      Integer page,
                                          @RequestParam(name="size",required = false)
                                                      Integer size,
                                          @RequestParam(name="min",required = false)
                                                      String minPrice,
                                          @RequestParam(name="max",required = false)
                                                      String maxPrice,
                                          @RequestParam(name="color", required = false)
                                                      Set<String> colors,
                                          @RequestParam(name="sortedBy",required = false)
                                                      String sorted,
                                          @RequestParam(name="status",required = false)
                                                      String status,
                                          @RequestParam(name = "brand",required = false)
                                                      Set<String> brands
    ){
        Pageable pageable = PageRequest.of(page,size);
        ProductSearch productSearch = new ProductSearch().fixSearch(serchValue).fixColor(colors).fixSorted(sorted).fixPrice(minPrice,maxPrice).fixStatus(status).fixBrand(brands);
        Map<String, Object> products = productServiceImple.searchAll(productSearch, pageable);
        List<ProductDTO> productDTO = new ProductResource().map(((List<Product>)products.get("product")));
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-total-count", String.valueOf((products.get("count"))));
        return new ResponseEntity(productDTO,headers, HttpStatus.OK);
    }


}
