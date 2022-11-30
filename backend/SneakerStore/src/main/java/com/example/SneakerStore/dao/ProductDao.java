package com.example.SneakerStore.dao;

import com.example.SneakerStore.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductDao extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {

    Page<Product> findAll(Specification<Product> spec,Pageable pageable);


    @Query(value="select p from Product p left join fetch p.color left join fetch p.sizes order by p.productid",countQuery="SELECT distinct count(p.productid) FROM Product p")
    Page<Product> findAll(Pageable pageable);


}
//Sombra2