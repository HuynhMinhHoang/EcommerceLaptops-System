package com.java.hminhhoangdev.service.impl;

import com.java.hminhhoangdev.model.Role;
import com.java.hminhhoangdev.repository.RoleRepository;
import com.java.hminhhoangdev.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
