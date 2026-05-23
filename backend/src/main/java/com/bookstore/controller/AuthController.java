package com.bookstore.controller;

import com.bookstore.model.LoginRequest;
import com.bookstore.model.RegisterRequest;
import com.bookstore.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final Map<String, User> users = new ConcurrentHashMap<>();

    public AuthController() {
        // demo regular user
        users.put("demo@bookstore.com", new User("Demo Reader", "demo@bookstore.com", "demo123", "user", "0987654321", "123 Đường Láng, Đống Đa, Hà Nội"));
        // initial admin account
        users.put("admin@bookstore.com", new User("Site Admin", "admin@bookstore.com", "admin123", "admin", "0900000000", "Văn phòng Nhà Sách, Quận 1, TP.HCM"));
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
            "email", user.getEmail(),
            "role", user.getRole(),
            "phone", user.getPhone() == null ? "" : user.getPhone(),
            "address", user.getAddress() == null ? "" : user.getAddress()
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

        User user = new User(request.getName(), email, request.getPassword(), "user", "", "");
        users.put(email, user);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Đăng ký thành công! Chào mừng " + user.getName(),
            "name", user.getName(),
            "email", user.getEmail(),
            "role", user.getRole(),
            "phone", "",
            "address", ""
        ));
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(@RequestBody User profileData) {
        if (profileData.getEmail() == null || profileData.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Email không hợp lệ."
            ));
        }
        String email = profileData.getEmail().toLowerCase();
        User user = users.get(email);
        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Không tìm thấy tài khoản người dùng."
            ));
        }

        user.setName(profileData.getName());
        if (profileData.getPassword() != null && !profileData.getPassword().trim().isEmpty()) {
            user.setPassword(profileData.getPassword());
        }
        user.setPhone(profileData.getPhone());
        user.setAddress(profileData.getAddress());

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Cập nhật thông tin hồ sơ thành công!",
            "name", user.getName(),
            "email", user.getEmail(),
            "role", user.getRole(),
            "phone", user.getPhone() == null ? "" : user.getPhone(),
            "address", user.getAddress() == null ? "" : user.getAddress()
        ));
    }
}
