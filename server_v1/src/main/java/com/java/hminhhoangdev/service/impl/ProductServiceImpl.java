package com.java.hminhhoangdev.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.java.hminhhoangdev.dto.request.ProductRequestDTO;
import com.java.hminhhoangdev.model.Category;
import com.java.hminhhoangdev.model.Image;
import com.java.hminhhoangdev.model.Product;
import com.java.hminhhoangdev.repository.CategoryRepository;
import com.java.hminhhoangdev.repository.ImageRepository;
import com.java.hminhhoangdev.repository.ProductRepository;
import com.java.hminhhoangdev.service.ProductService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public void addProduct(ProductRequestDTO productRequestDTO) {

        System.out.println(">>>>> Service Data from client: " + productRequestDTO);
        Product product = new Product();
        product.setNameProduct(productRequestDTO.getName());
        product.setPrice(productRequestDTO.getPrice());
        product.setDescription(productRequestDTO.getDescription());
        product.setQuantity(productRequestDTO.getQuantity());
        product.setStatus(productRequestDTO.isStatus());

        Category category = categoryRepository.findById(productRequestDTO.getCategoryId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category id"));
        product.setCategory(category);

        Set<Image> images = new HashSet<>();
        try {
            for (MultipartFile file : productRequestDTO.getImageUrls()) {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                String thumbnailUrl = (String) uploadResult.get("url");

                Image image = new Image();
                image.setThumbnail(thumbnailUrl);
                image.setProduct(product);
                images.add(image);
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload image", e);
        }

        product.setImages(images);

        try {
            productRepository.save(product);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save product", e);
        }
    }

    @Override
    public List<Product> getListProductAdmin() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getListProductByCategory(String category) {
        List<Product> allProducts = productRepository.findAll();
        int categoryId;

        switch (category.toUpperCase()) {
            case "LAPTOP GAMING":
                categoryId = 1;
                break;
            case "LAPTOP":
                categoryId = 2;
                break;
            case "PC":
                categoryId = 3;
                break;
            case "HEAD PHONE":
                categoryId = 4;
                break;
            case "MOUSE":
                categoryId = 5;
                break;
            case "SCREEN":
                categoryId = 6;
                break;
            case "KEY BOARD":
                categoryId = 7;
                break;
            default:
                return Collections.emptyList();
        }

        return allProducts.stream().filter(product -> product.isStatus() && product.getQuantity() > 0 && product.getCategory().getIdCategory() == categoryId).collect(Collectors.toList());
    }

    @Override
    public void updateProduct(Integer productId, ProductRequestDTO productRequestDTO) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        product.setNameProduct(productRequestDTO.getName());
        product.setPrice(productRequestDTO.getPrice());
        product.setDescription(productRequestDTO.getDescription());
        product.setQuantity(productRequestDTO.getQuantity());
        product.setStatus(productRequestDTO.isStatus());

        Category category = categoryRepository.findById(productRequestDTO.getCategoryId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category id"));
        product.setCategory(category);

        Set<Image> images = new HashSet<>(product.getImages());

        if (productRequestDTO.getImageUrls() != null) {
            try {
                for (MultipartFile file : productRequestDTO.getImageUrls()) {
                    if (!file.isEmpty()) {
                        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                        String thumbnailUrl = (String) uploadResult.get("url");

                        Image image = new Image();
                        image.setThumbnail(thumbnailUrl);
                        image.setProduct(product);
                        images.add(image);
                    }
                }
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload image", e);
            }
        }

        product.setImages(images);

        try {
            productRepository.save(product);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update product", e);
        }
    }

    @Override
    public void deleteProduct(Integer productId) {
        if (productId == null || productId <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid product ID");
        }

        Product product = productRepository.findById(productId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        try {
            List<Image> images = imageRepository.findImageByProduct(product);
            imageRepository.deleteAll(images);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete images", e);
        }

        try {
            productRepository.delete(product);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete product", e);
        }
    }

    @Override
    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

}
