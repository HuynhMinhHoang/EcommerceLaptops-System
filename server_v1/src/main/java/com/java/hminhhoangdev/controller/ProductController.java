package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.request.ProductRequestDTO;
import com.java.hminhhoangdev.dto.response.ResponseData;
import com.java.hminhhoangdev.dto.response.ResponseError;
import com.java.hminhhoangdev.model.Product;
import com.java.hminhhoangdev.service.ProductService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

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
    public ResponseData<String> getListProductAdmin() {
        try {
            return new ResponseData(HttpStatus.OK.value(), "data", productService.getListProductAdmin());
        } catch (Exception e) {
            return new ResponseError(HttpStatus.OK.value(), e.getMessage());
        }
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
