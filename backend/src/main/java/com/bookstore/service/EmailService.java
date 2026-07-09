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
    public void sendOrderConfirmationEmail(com.bookstore.model.Order order) {
        if (order == null || order.getShippingInfo() == null || order.getShippingInfo().getEmail() == null || order.getShippingInfo().getEmail().isEmpty()) {
            System.out.println("Không thể gửi email vì thiếu địa chỉ email của khách hàng.");
            return;
        }
        
        String to = order.getShippingInfo().getEmail();
        String paymentMethod = order.getShippingInfo().getPaymentMethod();
        boolean isPaid = "VNPAY".equalsIgnoreCase(paymentMethod);
        
        String subject = (isPaid ? "Xác nhận thanh toán đơn hàng #" : "Xác nhận đặt hàng thành công #") + order.getId() + " - BookStore";
        
        StringBuilder text = new StringBuilder();
        text.append("Kính gửi ").append(order.getShippingInfo().getName()).append(",\n\n");
        if (isPaid) {
            text.append("Cảm ơn bạn đã mua sắm tại BookStore. Chúng tôi đã nhận được thanh toán cho đơn hàng của bạn.\n\n");
        } else {
            text.append("Cảm ơn bạn đã mua sắm tại BookStore. Đơn hàng của bạn đã được ghi nhận trên hệ thống.\n\n");
        }
        text.append("THÔNG TIN ĐƠN HÀNG: ").append(order.getId()).append("\n");
        text.append("Trạng thái: ").append(order.getStatus()).append("\n");
        text.append("Địa chỉ giao hàng: ").append(order.getShippingInfo().getAddress()).append("\n\n");
        text.append("CHI TIẾT SẢN PHẨM:\n");
        
        for (com.bookstore.model.OrderItem item : order.getItems()) {
            text.append("- ").append(item.getTitle()).append(" x").append(item.getQuantity())
                .append(" : ").append(String.format("%,.0f", item.getPrice())).append(" đ\n");
        }
        
        double total = order.getTotal() + (order.getTotal() >= 300000 ? 0 : 30000);
        text.append("\nTổng thanh toán: ").append(String.format("%,.0f", total)).append(" đ\n\n");
        text.append("Chúng tôi sẽ sớm giao hàng đến bạn. Xin cảm ơn!");

        if (javaMailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(to);
                message.setSubject(subject);
                message.setText(text.toString());
                javaMailSender.send(message);
                System.out.println("Đã gửi email xác nhận đơn hàng tới: " + to);
            } catch (Exception e) {
                System.err.println("Lỗi gửi email xác nhận: " + e.getMessage());
                System.out.println("=> NỘI DUNG EMAIL (Hiển thị tạm vì chưa cấu hình email):\n" + text.toString());
            }
        } else {
            System.out.println("=> NỘI DUNG EMAIL GỬI TỚI " + to + " (Chưa cấu hình mail server):\n" + text.toString());
        }
    }
}
