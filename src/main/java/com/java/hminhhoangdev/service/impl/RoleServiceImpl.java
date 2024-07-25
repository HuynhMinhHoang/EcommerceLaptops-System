package com.java.hminhhoangdev.service.impl;

import com.java.hminhhoangdev.model.Role;
import com.java.hminhhoangdev.repository.RoleRepository;
import com.java.hminhhoangdev.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        System.out.println("+>>>>>>>>>>>> role:" + roleRepository.findAll());
        return roleRepository.findAll();
    }
}
