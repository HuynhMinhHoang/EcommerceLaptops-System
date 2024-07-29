package com.java.hminhhoangdev.repository;

import com.java.hminhhoangdev.model.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @EntityGraph(attributePaths = {"category", "images"})
    List<Product> findAll();

    @EntityGraph(attributePaths = {"category", "images"})
    Optional<Product> findById(Integer id);
}




