package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.request.ProductRequestDTO;
import com.java.hminhhoangdev.dto.response.ResponseData;
import com.java.hminhhoangdev.dto.response.ResponseError;
import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.model.Product;
import com.java.hminhhoangdev.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid product ID");
        }

        Optional<Product> product = productService.getProductById(id);

        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
    }

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseData<?> addProduct(@ModelAttribute ProductRequestDTO productRequestDTO, Authentication authentication) {
        try {
            System.out.println(">>>>>Data from client: " + productRequestDTO);
            productService.addProduct(productRequestDTO);
            return new ResponseData<>(HttpStatus.OK.value(), "Product add successfully!");
        } catch (ResponseStatusException e) {
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        } catch (Exception e) {
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    @PutMapping(value = "/update/{id}", consumes = "multipart/form-data")
    public ResponseData<?> updateProduct(@PathVariable Integer id, @ModelAttribute ProductRequestDTO productRequestDTO) {
        try {
            productService.updateProduct(id, productRequestDTO);
            return new ResponseData<>(HttpStatus.OK.value(), "Product updated successfully!");
        } catch (ResponseStatusException e) {
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        } catch (Exception e) {
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseData<String> getListProductByCategory(@RequestParam String category) {
        try {
            List<Product> products = productService.getListProductByCategory(category);
            if (products.isEmpty()) {
                return new ResponseError(HttpStatus.NOT_FOUND.value(), "No products found for the given category.");
            }
            return new ResponseData(HttpStatus.OK.value(), "data", products);
        } catch (Exception e) {
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    @GetMapping("/list-admin")
    public ResponseEntity<Page<Product>> getListProductAdmin(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Product> products = productService.getListProductAdmin(pageable);
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer productId) {
        try {
            productService.deleteProduct(productId);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatusCode());
        } catch (Exception ex) {
            return new ResponseEntity<>("An error occurred while deleting the product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
