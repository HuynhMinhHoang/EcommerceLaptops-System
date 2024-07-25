package com.java.hminhhoangdev.repository;

import com.java.hminhhoangdev.model.Image;
import com.java.hminhhoangdev.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findImageByProduct(Product product);
}
