package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.response.ResponseData;
import com.java.hminhhoangdev.dto.response.ResponseError;
import com.java.hminhhoangdev.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @DeleteMapping("/delete")
    public ResponseData<?> deleteImages(@RequestBody List<Integer> imageIds) {
//        System.out.println("ID IMG" + imageIds);
        if (imageIds == null || imageIds.isEmpty()) {
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "No image IDs provided");
        }
        try {
            imageService.deleteImages(imageIds);
            return new ResponseData(HttpStatus.OK.value(), "Images deleted successfully");
        } catch (Exception e) {
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }
}
