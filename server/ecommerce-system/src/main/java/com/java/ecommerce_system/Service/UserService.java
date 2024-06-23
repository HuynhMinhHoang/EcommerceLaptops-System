package com.java.ecommerce_system.Service;

import com.java.ecommerce_system.Model.Account;
import com.java.ecommerce_system.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> user = userRepository.findByUsername(username);

//        kiem tra user ton tai
        if (user.isPresent()) {
            var userObj = user.get();
            return User.builder().username(userObj.getUsername()).password(userObj.getPassword()).roles(getRoles(userObj)).build();

        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    private String[] getRoles(Account user) {
        if (user.getRole() == null) {
            return new String[]{"USER"};
        }
        return user.getRole().split(",");
    }
}
