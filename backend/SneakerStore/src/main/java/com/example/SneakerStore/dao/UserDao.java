package com.example.SneakerStore.dao;

import com.example.SneakerStore.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    @Query(value="select distinct u from User u left join fetch u.cart c left join fetch u.authorities where u.username=?1")
    User findByUsername(String username);


    @Query(value="select distinct u from User u left join fetch u.cart c left join fetch u.authorities where u.id=?1")
    User findById(int id);

}
