package com.java.hminhhoangdev.dto.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ProductRequestDTO {
    private String name;
    private double price;
    private String description;
    private boolean status;
    private int quantity;
    private int categoryId;
    private List<MultipartFile> imageUrls;

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<MultipartFile> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<MultipartFile> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ProductRequestDTO{" +
                "categoryId=" + categoryId +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", quantity=" + quantity +
                ", imageUrls=" + imageUrls +
                '}';
    }
}

