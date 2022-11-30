package com.example.SneakerStore.dao.filter;

import com.example.SneakerStore.domain.Brand;
import com.example.SneakerStore.domain.Color;
import com.example.SneakerStore.domain.Product;
import com.example.SneakerStore.service.imple.ProductSearch;
import org.springframework.data.jpa.domain.Specification;


import javax.persistence.criteria.Join;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


public class SearchSpecification {
    public SearchSpecification(){}

    public static Specification<Product> searchProduct(ProductSearch productSearch){
        String min = productSearch.getMinPrice();
        String max = productSearch.getMaxPrice();
        Set<String> colors = productSearch.getColors();
        String searchValue = productSearch.getSearch();
        String[] sorted = productSearch.getSortedBy()==null?null : productSearch.getSortedBy().split("_");
        String status=productSearch.getStatus();
        Set<String> productBrand=productSearch.getProductBrand();


        return allSpec(status,searchValue,colors,min,max,sorted,productBrand);


    }

    public static Specification<Product> createProductById(List<Integer> productId, ProductSearch productSerchCriteria) {
        String[] sorted = productSerchCriteria.getSortedBy()==null?null : productSerchCriteria.getSortedBy().split("_");

        return (root, query, builder) -> {
            query.distinct(true);
            if(sorted!=null) {
                Order o = sorted[1].equals("ASC")
                        ? builder.asc(root.get(sorted[0])) : builder.desc(root.get(sorted[0]));
                query.orderBy(o, builder.asc(root.get("productid")));
            }
            Class<?> a = query.getResultType();
            if(a.getTypeName()!= Long.class.getTypeName()) {
                root.fetch("color");
                root.fetch("sizes");
                root.fetch("productBrand");
                return root.in(productId);
            }

            return builder.conjunction();
        };
    }



    public static Specification<Product>allSpec(String status, String brand, Set<String> colors, String minPrice, String maxPrice, String[] sorted, Set<String> names){
        return ((root, query, builder) ->{
            query.distinct(true);
            List<Predicate> predicates=new ArrayList<>();
            if(sorted!=null) {
                Order o = sorted[1].equals("ASC")
                        ? builder.asc(root.get(sorted[0])) : builder.desc(root.get(sorted[0]));

                query.orderBy(o, builder.asc(root.get("productid")));
            }

            if(status!=null && status.length()>0){
                predicates.add(builder.equal(root.get("status"),status));
            }

            if(brand!=null && brand.length()>0){
                String[] value=brand.toLowerCase().split(" ");
                String parseRegex= Arrays.stream(value).map(str->"%"+str+"%").collect(Collectors.joining("_"));
                System.out.println(parseRegex);

                predicates.add(builder.like(builder.lower(builder.function("CONCAT_WS", String.class,builder.literal("_"),root.get("brand"),root.get("modle"))),
                        parseRegex));
            }

            if(colors!=null && colors.size()>0){
                Join<Product, Color> productColorJoin = root.join("color");
                predicates.add(productColorJoin.get("name").in(colors));
            }

            if(minPrice!=null || maxPrice!=null){
                predicates.add(builder.between(root.get("price"), minPrice, maxPrice));
            }

            if(names!=null && names.size()>0){
                Join<Product, Brand>productBrandJoin = root.join("productBrand");
                predicates.add(productBrandJoin.get("name").in(names));
            }


            Predicate[] arrPred=new Predicate[predicates.size()];
            predicates.toArray(arrPred);

            return builder.and(arrPred);
        });

    }


}
