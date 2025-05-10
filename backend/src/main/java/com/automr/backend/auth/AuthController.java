package com.automr.backend.auth;

import com.automr.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(req.getUsername());
            String token = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new LoginResponse(token));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}