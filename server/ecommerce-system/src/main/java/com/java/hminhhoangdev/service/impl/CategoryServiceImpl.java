package com.java.hminhhoangdev.service.impl;

import com.java.hminhhoangdev.model.Category;
import com.java.hminhhoangdev.repository.CategoryRepository;
import com.java.hminhhoangdev.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getListCategory() {
        return categoryRepository.findAll();
    }
}
