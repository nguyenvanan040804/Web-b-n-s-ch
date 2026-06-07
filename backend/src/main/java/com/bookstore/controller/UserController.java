package com.bookstore.controller;

import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<Map<String, Object>> updateUserRole(@PathVariable("id") Long id, @RequestBody Map<String, String> body) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = optionalUser.get();
        String newRole = body.get("role");
        if (newRole != null && (newRole.equals("admin") || newRole.equals("user"))) {
            user.setRole(newRole);
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("success", true, "message", "Đã cập nhật quyền thành công", "user", user));
        }
        return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Quyền không hợp lệ"));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateUserStatus(@PathVariable("id") Long id, @RequestBody Map<String, Boolean> body) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = optionalUser.get();
        Boolean isActive = body.get("isActive");
        if (isActive != null) {
            user.setActive(isActive);
            userRepository.save(user);
            String statusMsg = isActive ? "Mở khóa" : "Khóa";
            return ResponseEntity.ok(Map.of("success", true, "message", "Đã " + statusMsg + " tài khoản thành công", "user", user));
        }
        return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Trạng thái không hợp lệ"));
    }
}
