package com.java.hminhhoangdev.service;

import com.java.hminhhoangdev.dto.request.ProductRequestDTO;
import com.java.hminhhoangdev.model.Product;
import io.swagger.models.auth.In;

import java.util.List;

public interface ProductService {
    void addProduct(ProductRequestDTO productRequestDTO);

    List<Product> getListProductAdmin();

    List<Product> getListProductByCategory(String category);

    void updateProduct(Integer productId, ProductRequestDTO productRequestDTO);

    void deleteProduct(Integer productId);
}
