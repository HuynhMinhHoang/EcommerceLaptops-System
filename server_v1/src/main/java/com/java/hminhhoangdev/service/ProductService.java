package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.dto.request.ProductRequestDTO;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.model.Product;
import io.swagger.models.auth.In;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    void addProduct(ProductRequestDTO productRequestDTO);

    Page<Product> getListProductAdmin(Pageable pageable);

    List<Product> getListProductByCategory(String category);

    void updateProduct(Integer productId, ProductRequestDTO productRequestDTO);

    void deleteProduct(Integer productId);

    Optional<Product> getProductById(Integer id);

}
