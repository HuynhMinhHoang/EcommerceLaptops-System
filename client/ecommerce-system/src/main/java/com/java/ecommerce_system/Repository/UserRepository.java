package com.java.ecommerce_system.Repository;

import com.java.ecommerce_system.Model.Users;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository {
    List<Users> getListUser();
}
