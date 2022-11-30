package com.example.SneakerStore.dao;

import com.example.SneakerStore.domain.Size;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class SizeDaoImpl implements SizeDaoCustom{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void updateSize(List<Long> updateIndex, List<Integer> updateColumne) {
        String str="update size_prod s set s.qunatity = case s.id ";
        for(int i=0;i<updateIndex.size();i++){
            str+="when "+updateIndex.get(i)+" then "+updateColumne.get(i)+" ";
        }
        str+="else s.qunatity end where s.id in(";
        for(int i=0;i<updateIndex.size();i++){
            str+=updateIndex.get(i)+",";
        }
        str=str.substring(0,str.length()-1);
        str+=")";
        entityManager.createNativeQuery(str, Size.class).executeUpdate();
    }
}
