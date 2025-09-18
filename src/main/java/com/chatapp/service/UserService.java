//package com.chatapp.service;
//
//import com.chatapp.dto.RegisterRequest;
//import com.chatapp.dto.LoginRequest;
//import com.chatapp.model.Role;
//import com.chatapp.model.User;
//import com.chatapp.repository.UserRepository;
//import com.chatapp.util.JwtUtil;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//import java.util.List;
//import java.util.Collections;
//
//@Service
//public class UserService implements UserDetailsService {
//	
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    //  Required by Spring Security for authentication
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByEmail(username)
//            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
//
//        return new org.springframework.security.core.userdetails.User(
//            user.getEmail(),       
//            user.getPassword(),    
//            Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()))
//        );
//    }
//
//    public User register(RegisterRequest request) {
//        if (request.getEmail() == null || request.getEmail().isEmpty() ||
//            request.getPassword() == null || request.getPassword().isEmpty()) {
//            throw new IllegalArgumentException("Email and password must not be empty.");
//        }
//
//        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
//            throw new IllegalStateException("A user with this email already exists.");
//        }
//
//        User user = new User();
//        user.setUsername(request.getUsername());
//        user.setEmail(request.getEmail());
//       // user.setPassword(request.getPassword());
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        user.setStatus("Offline");
//        user.setCreatedAt(new Date());
//        user.setTimezone(request.getTimezone());
//
//        if (request.getRole() != null) {
//            try {
//                user.setRole(Role.valueOf(request.getRole().toUpperCase()));
//            } catch (IllegalArgumentException e) {
//                throw new IllegalArgumentException("Invalid role provided.");
//            }
//        } else {
//            throw new IllegalArgumentException("Role must not be null.");
//        }
//
//        return userRepository.save(user);
//    }
//
//    public String login(LoginRequest request) {
//        return userRepository.findByEmail(request.getEmail())
//            .filter(user -> user.getPassword().equals(request.getPassword()))
//            .map(user -> {
//                user.setStatus("Online");
//                userRepository.save(user);
//                return jwtUtil.generateToken(user);
//            })
//            .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
//    }
//
//    public List<User> searchUsers(String keyword) {
//        return userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
//    }
//    public User getUserProfileById(String userId) {
//        return userRepository.findById(userId)
//                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
//    }
//
//}
package com.chatapp.service;

import com.chatapp.dto.RegisterRequest;
import com.chatapp.dto.LoginRequest;
import com.chatapp.model.Role;
import com.chatapp.model.User;
import com.chatapp.repository.UserRepository;
import com.chatapp.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Collections;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // Required by Spring Security
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()))
        );
    }

    // Register a new user
    public User register(RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().isEmpty() ||
            request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Email and password must not be empty.");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalStateException("A user with this email already exists.");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus("Offline");
        user.setCreatedAt(new Date());
        user.setTimezone(request.getTimezone());

        if (request.getRole() != null) {
            try {
                user.setRole(Role.valueOf(request.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid role provided.");
            }
        } else {
            throw new IllegalArgumentException("Role must not be null.");
        }

        return userRepository.save(user);
    }

    // Login and return JWT token
    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        user.setStatus("Online");
        userRepository.save(user);

        return jwtUtil.generateToken(user);
    }

    // Search users by keyword
    public List<User> searchUsers(String keyword) {
        return userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
    }

    // Get user profile by ID
    public User getUserProfileById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
    }

    public String getUsernameById(String userId) {
        User user = getUserProfileById(userId);
        return user.getUsername();
    }
}

