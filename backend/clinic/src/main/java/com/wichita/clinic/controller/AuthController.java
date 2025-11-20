package com.wichita.clinic.controller;

import com.wichita.clinic.dto.LoginRequest;
import com.wichita.clinic.entity.User;
import com.wichita.clinic.security.JwtUtil;
import com.wichita.clinic.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder, UserService userService) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            System.out.println("Attempting login for username: " + req.getName());

            // Check if user exists in DB and print password hash
            User savedUser = userService.findByName(req.getName()).orElse(null);
            if (savedUser != null) {
                System.out.println("Stored password hash: " + savedUser.getPassword());
                System.out.println("Password matches '1234'? " + passwordEncoder.matches("1234", savedUser.getPassword()));
            } else {
                System.out.println("User not found in DB");
            }

            // Authenticate using AuthenticationManager
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getName(), req.getPassword())
            );

            // Generate JWT
            String token = jwtUtil.generateToken(req.getName());
            return ResponseEntity.ok(token);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(404).body("User not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }



    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userService.findByName(user.getName()).isPresent()) {
            return "User already exists!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);


        return "User registered successfully";
    }

    @PostMapping("/logout")
    public String logout() {
        return "Logged out successfully!";
    }


}

