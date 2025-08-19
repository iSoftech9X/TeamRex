package com.chatapp.controller;

import com.chatapp.dto.AuthRequest;
import com.chatapp.dto.AuthResponse;
import com.chatapp.dto.LoginRequest;
import com.chatapp.dto.RegisterRequest;
import com.chatapp.model.User;
import com.chatapp.repository.UserRepository;
import com.chatapp.service.UserService;
import com.chatapp.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	 @Autowired
	    private AuthenticationManager authManager;

	    @Autowired
	    private JwtUtil jwtUtil;

	    @Autowired
	    private UserRepository userRepo;
    
	    @Autowired
       private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        User user = userService.register(request);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepo.findByEmail(request.getEmail()).orElseThrow();

       
        user.setStatus("Online");
        userRepo.save(user);

        String token = jwtUtil.generateToken(user);

        return new AuthResponse(
            token,
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole().toString(),  
            user.getTimezone(),
            user.getStatus(),
            user.getCreatedAt().toString()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam("q") String query) {
        List<User> users = userService.searchUsers(query);
        return ResponseEntity.ok(users); 
    }
    
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        user.setStatus("Offline");
        userRepo.save(user);
        return ResponseEntity.ok("User logged out successfully.");
    }


}
