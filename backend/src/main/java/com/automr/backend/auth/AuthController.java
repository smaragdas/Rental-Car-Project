package com.automr.backend.auth;

import com.automr.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    
    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil) {
        this.authManager = authManager;
        this.jwtUtil      = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            // will throw if bad creds
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    req.getUsername(), req.getPassword()
                )
            );
            String token = jwtUtil.generateToken(req.getUsername());
            return ResponseEntity.ok(new LoginResponse(token));
        } catch (AuthenticationException ex) {
            return ResponseEntity
                .status(401)
                .body("Invalid username or password");
        }
    }
}