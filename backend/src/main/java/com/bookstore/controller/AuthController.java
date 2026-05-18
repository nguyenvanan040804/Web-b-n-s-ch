package com.bookstore.controller;

import com.bookstore.model.LoginRequest;
import com.bookstore.model.RegisterRequest;
import com.bookstore.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final Map<String, User> users = new ConcurrentHashMap<>();

    public AuthController() {
        users.put("demo@bookstore.com", new User("Demo Reader", "demo@bookstore.com", "demo123"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Validated @RequestBody LoginRequest request) {
        User user = users.get(request.getEmail().toLowerCase());
        if (user == null || !user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Email hoặc mật khẩu không đúng."
            ));
        }

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Đăng nhập thành công! Chào mừng " + user.getName(),
            "name", user.getName(),
            "email", user.getEmail()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Validated @RequestBody RegisterRequest request) {
        String email = request.getEmail().toLowerCase();
        if (users.containsKey(email)) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Email này đã được đăng ký. Vui lòng dùng email khác."
            ));
        }

        User user = new User(request.getName(), email, request.getPassword());
        users.put(email, user);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Đăng ký thành công! Chào mừng " + user.getName(),
            "name", user.getName(),
            "email", user.getEmail()
        ));
    }
}
