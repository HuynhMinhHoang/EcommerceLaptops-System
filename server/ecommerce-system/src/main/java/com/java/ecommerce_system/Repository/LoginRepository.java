package com.java.ecommerce_system.Repository;

import com.java.ecommerce_system.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
}
