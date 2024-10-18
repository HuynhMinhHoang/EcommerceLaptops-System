package com.java.hminhhoangdev.repository;

import com.java.hminhhoangdev.model.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @EntityGraph(attributePaths = {"category", "images"})
    List<Product> findAll();

    @EntityGraph(attributePaths = {"category", "images"})
    Optional<Product> findById(Integer id);

    @Query("SELECT p FROM Product p WHERE LOWER(p.nameProduct) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(String keyword);
}




