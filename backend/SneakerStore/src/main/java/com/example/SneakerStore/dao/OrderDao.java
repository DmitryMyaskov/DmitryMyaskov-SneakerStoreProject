package com.example.SneakerStore.dao;

import com.example.SneakerStore.domain.OrderCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDao extends JpaRepository<OrderCart, Integer> {

    @Modifying
    @Query(value="update order_cart o set o.quantity=(select oc.quantity from order_cart oc where oc.size_id=?2 and oc.cart_id=?1)+1 where o.size_id=?2 and o.cart_id=?1",nativeQuery=true)
    void increase(Integer cartId, Long sizeId);

//    insert into order_cart(id,quantity,product_id,cart_id) values (1,1,1,2);
//    update size_prod s set s.qunatity=(select sp.qunatity from size_prod sp where sp.id=1)-1 where s.id=1;

    @Modifying
    @Query(value="update order_cart o set o.quantity=(select oc.quantity from order_cart oc where oc.size_id=?2 and oc.cart_id=?1)-1 where o.size_id=?2 and o.cart_id=?1",nativeQuery=true)
    void decrease(Integer cartId, Long sizeId);


    @Query(value="select o from OrderCart o left join fetch o.size s left join fetch s.product where o.cart.id=?1")
    List<OrderCart> findOrders(Integer cartId);



    @Modifying
    @Query(value="delete from OrderCart o where o.cart.id=?1 and o.size.id=?2")
    void removeOrder(Integer cartId, long sizeId);


    @Modifying
    @Query(value="delete from OrderCart o where o.cart.id=?1")
    void removeAllByCart(int cartId);



}
