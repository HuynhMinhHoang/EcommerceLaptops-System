package com.java.ecommerce_system.Service.Impl;

import com.java.ecommerce_system.Model.Users;
import com.java.ecommerce_system.Repository.UserRepository;
import com.java.ecommerce_system.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Users> getAllUsers() {
        return userRepository.getListUser();
    }
}
