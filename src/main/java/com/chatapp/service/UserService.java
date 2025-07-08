package com.chatapp.service;

import com.chatapp.dto.RegisterRequest;
import com.chatapp.dto.LoginRequest;
import com.chatapp.model.User;
import com.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service 
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public User register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole() != null ? request.getRole() : "MEMBER");
        user.setStatus("Offline");
        user.setCreatedAt(new Date());
        return userRepository.save(user);
    }

    public Optional<User> login(LoginRequest request) {
        return userRepository.findByEmail(request.getEmail())
            .filter(user -> user.getPassword().equals(request.getPassword()))
            .map(user -> {
                user.setStatus("Online");
                userRepository.save(user);
                return user;
            });
    }

    public List<User> searchUsers(String keyword) {
        return userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
    }


}
