package com.automr.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "error", "Something went wrong",
                        "details", ex.getMessage()
                ));
    }

    // You can add more handlers, e.g.:
    // @ExceptionHandler(EntityNotFoundException.class)
    // public ResponseEntity<?> handleNotFound(EntityNotFoundException ex) { ... }

}