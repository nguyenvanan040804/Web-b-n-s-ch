package com.bookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender javaMailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username:bookstore@example.com}")
    private String fromEmail;

    public void sendOtpEmail(String to, String otpCode) {
        String subject = "Xác thực tài khoản BookStore";
        String text = "Mã xác thực OTP của bạn là: " + otpCode + "\nMã này có hiệu lực trong 5 phút.";

        if (javaMailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(to);
                message.setSubject(subject);
                message.setText(text);
                javaMailSender.send(message);
                System.out.println("Đã gửi email OTP thành công tới: " + to);
            } catch (Exception e) {
                System.err.println("Lỗi gửi email: " + e.getMessage());
                System.out.println("=> MÃ OTP (Hiển thị tạm vì chưa cấu hình email): " + otpCode);
            }
        } else {
            System.out.println("MÃ OTP CHO " + to + " LÀ: " + otpCode + " (Chưa cấu hình mail server)");
        }
    }
}
