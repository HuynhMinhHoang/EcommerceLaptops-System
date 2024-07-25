package com.java.hminhhoangdev.service.impl;

import com.java.hminhhoangdev.model.Image;
import com.java.hminhhoangdev.repository.ImageRepository;
import com.java.hminhhoangdev.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public void deleteImages(List<Integer> imageIds) {
        List<Integer> notFoundIds = imageIds.stream()
                .filter(id -> !imageRepository.existsById(id))
                .toList();

        if (!notFoundIds.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Images not found with ids: " + notFoundIds
            );
        }

        for (Integer id : imageIds) {
            imageRepository.deleteById(id);
        }
    }
}
