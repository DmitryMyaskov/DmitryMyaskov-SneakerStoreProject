package com.example.SneakerStore.service.imple;

import com.example.SneakerStore.controller.model.OrderDto;
import com.example.SneakerStore.controller.model.SizeDTO;
import com.example.SneakerStore.dao.OrderDao;
import com.example.SneakerStore.dao.SizeDao;
import com.example.SneakerStore.domain.Size;
import com.example.SneakerStore.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SizeServiceImple implements SizeService {
    @Autowired
    private SizeDao sizeDao;

    @Autowired
    private OrderDao orderDao;

    @Transactional
    @Override
    public String inc(Long sizeId, int count) {
        sizeDao.incOrder(sizeId, count);

        return "inc size";
    }
    @Transactional
    @Override
    public String dec(OrderDto orderDto) {
        List<SizeDTO> sizes = orderDto.getProducts();
        Iterable<Long> iterable = sizes.stream().map(s->s.getId()).collect(Collectors.toList());
        List<Size> findSize = sizeDao.findAllById(iterable);

        List<Integer> updateColumn = new ArrayList<>();
        List<Long> updateIndex = new ArrayList<>();
        List<Long> delete = new ArrayList<>();

        for(int i=0;i<findSize.size();i++){
            Size s = findSize.get(i);
            SizeDTO sd= sizes.get(i);
            if(s.getQuantity()-sd.getStock()>0){
                updateIndex.add(s.getId());
                updateColumn.add(s.getQuantity()-sd.getStock());
            }
            else if(s.getQuantity()-sd.getStock()==0){
                delete.add(s.getId());
            }
        }
        if(delete.size()>0)
            sizeDao.delSize(delete);
        if(updateIndex.size()>0)
            sizeDao.updateSize(updateIndex,updateColumn);


        orderDao.removeAllByCart(orderDto.getId());

        return "ok";
    }


}
