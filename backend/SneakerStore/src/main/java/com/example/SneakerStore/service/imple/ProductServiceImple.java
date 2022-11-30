package com.example.SneakerStore.service.imple;

import com.example.SneakerStore.dao.ProductDao;
import com.example.SneakerStore.dao.filter.SearchSpecification;
import com.example.SneakerStore.domain.Product;
import com.example.SneakerStore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImple implements ProductService {

    @Autowired
    private ProductDao productDao;

    @Override
    public Map<String, Object> searchAll(ProductSearch productSearch, Pageable pageable) {
        Map<String, Object> map =new HashMap<>();
        Specification<Product> specification1 = SearchSpecification.searchProduct(productSearch);
        Page<Product> productsBySpec=productDao.findAll(specification1,pageable);

        int count = (int) productsBySpec.getTotalPages();
        List<Integer> productsId=productsBySpec.getContent().stream().map(p->p.getProductid()).collect(Collectors.toList());
        Specification<Product> specification2 = SearchSpecification.createProductById(productsId,productSearch);


        List<Product> fetchProduct = productDao.findAll(specification2);
        map.put("product",fetchProduct);
        map.put("count",count);

        return map;
    }

//    @Transactional(readOnly = true)
//    @Override
//    public Map<String, Object> findPage(Pageable pageable) {
//        Page<Product> list = productDao.findAll(pageable);
//        Map<String,Object> map =new HashMap<>();
//        map.put("product",list);
//        map.put("count",list.getTotalPages());
//        return map;
//    }
//
//    @Transactional(readOnly = true)
//    @Override
//    public Map<String, Object> findAll(ProductSerchCriteria productSerchCriteria, Pageable pageable) {
//        Map<String,Object> map =new HashMap<>();
//        Specification<Product> specification = ProductSpecifications.createProductBySpec(productSerchCriteria);
//        Page<Product> productsBySpec=productDao.findAll(specification,pageable);
//        int count = (int) productsBySpec.getTotalPages();
//        List<Integer> productsId=productsBySpec.getContent().stream().map(p->p.getProductid()).collect(Collectors.toList());
//        Specification<Product> specification1 = ProductSpecifications.createProductById(productsId,productSerchCriteria);
//
//
//        List<Product> fetchProduct = productDao.findAll(specification1);
//        map.put("product",fetchProduct);
//        map.put("count",count);
//        return map;
//    }
}
