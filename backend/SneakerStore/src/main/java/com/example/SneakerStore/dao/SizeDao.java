package com.example.SneakerStore.dao;

import com.example.SneakerStore.domain.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface SizeDao extends JpaRepository<Size, Long>,SizeDaoCustom {

    @Modifying
    @Query(value="update size_prod s set s.qunatity=(select sp.qunatity from size_prod sp where sp.id=?1)+?2 where s.id=?1",nativeQuery=true)
    void incOrder(Long sizeId, int count);



    @Modifying
    @Query(value="delete from Size s where s.id in :listId")
    void delSize(@Param("listId") Collection<Long> listId);

}
