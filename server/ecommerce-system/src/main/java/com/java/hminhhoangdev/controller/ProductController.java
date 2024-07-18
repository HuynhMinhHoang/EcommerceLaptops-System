package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.request.ProductRequestDTO;
import com.java.hminhhoangdev.dto.response.ResponseData;
import com.java.hminhhoangdev.dto.response.ResponseError;
import com.java.hminhhoangdev.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/product")
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

}
