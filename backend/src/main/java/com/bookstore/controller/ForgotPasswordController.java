package com.bookstore.controller;

import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/forgot-password")
@CrossOrigin(origins = "*")
public class ForgotPasswordController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    // Lưu OTP tạm
    private final Map<String, String> otpStore = new HashMap<>();

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    // ================= GỬI OTP =================
    @PostMapping("/send-otp")
    public Map<String, Object> sendOtp(
            @RequestBody Map<String, String> body
    ) {

        Map<String, Object> response = new HashMap<>();

        try {

            String email = body.get("email");

            Optional<User> userOpt =
                    userRepository.findByEmail(email);

            if (userOpt.isEmpty()) {

                response.put("success", false);
                response.put("message", "Email không tồn tại");

                return response;
            }

            // tạo OTP
            String otp = String.valueOf(
                    100000 + new Random().nextInt(900000)
            );

            otpStore.put(email, otp);

            // gửi mail
            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setTo(email);
            message.setSubject("OTP đặt lại mật khẩu");

            message.setText(
                    "Mã OTP của bạn là: " + otp
            );

            mailSender.send(message);

            System.out.println("OTP: " + otp);

            response.put("success", true);
            response.put("message", "Đã gửi OTP");

        } catch (Exception e) {

            e.printStackTrace();

            response.put("success", false);
            response.put("message", "Không gửi được email");
        }

        return response;
    }

    // ================= VERIFY OTP =================
    @PostMapping("/verify-otp")
    public Map<String, Object> verifyOtp(
            @RequestBody Map<String, String> body
    ) {

        Map<String, Object> response = new HashMap<>();

        String email = body.get("email");
        String otp = body.get("otp");

        String savedOtp = otpStore.get(email);

        if (savedOtp != null && savedOtp.equals(otp)) {

            response.put("success", true);
            response.put("message", "OTP đúng");

        } else {

            response.put("success", false);
            response.put("message", "OTP không đúng");
        }

        return response;
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public Map<String, Object> resetPassword(
            @RequestBody Map<String, String> body
    ) {

        Map<String, Object> response = new HashMap<>();

        try {

            String email = body.get("email");
            String newPassword = body.get("newPassword");

            Optional<User> userOpt =
                    userRepository.findByEmail(email);

            if (userOpt.isEmpty()) {

                response.put("success", false);
                response.put("message", "Không tìm thấy user");

                return response;
            }

            User user = userOpt.get();

            user.setPassword(
                    passwordEncoder.encode(newPassword)
            );

            userRepository.save(user);

            response.put("success", true);
            response.put("message", "Đổi mật khẩu thành công");

        } catch (Exception e) {

            e.printStackTrace();

            response.put("success", false);
            response.put("message", "Lỗi đổi mật khẩu");
        }

        return response;
    }
}