package com.example.SneakerStore.dao;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeDaoCustom {
    void updateSize(List<Long> updateIndex, List<Integer> updateColumne);
}
