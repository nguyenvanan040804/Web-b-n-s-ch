package com.bookstore.controller;

import com.bookstore.model.ForgotPasswordRequest;
import com.bookstore.model.ResetPasswordRequest;
import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class ForgotPasswordController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    private final Map<String, String> otpStorage = new HashMap<>();

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody ForgotPasswordRequest request
    ) {

        Optional<User> userOptional =
                userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            "Email không tồn tại"
                    )
            );
        }

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        otpStorage.put(request.getEmail(), otp);

        try {

            SimpleMailMessage mailMessage =
                    new SimpleMailMessage();

            mailMessage.setTo(request.getEmail());

            mailMessage.setSubject(
                    "Mã OTP đặt lại mật khẩu"
            );

            mailMessage.setText(
                    "OTP của bạn là: " + otp
            );

            mailSender.send(mailMessage);

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Đã gửi OTP qua email"
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            "Không gửi được email"
                    )
            );
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request
    ) {

        String savedOtp =
                otpStorage.get(request.getEmail());

        if (savedOtp == null ||
                !savedOtp.equals(request.getOtp())) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            "OTP không đúng"
                    )
            );
        }

        Optional<User> userOptional =
                userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            "User không tồn tại"
                    )
            );
        }

        User user = userOptional.get();

        user.setPassword(request.getNewPassword());

        userRepository.save(user);

        otpStorage.remove(request.getEmail());

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Đổi mật khẩu thành công"
                )
        );
    }
}