package com.bookstore.controller;

import com.bookstore.config.VNPayConfig;
import com.bookstore.model.Order;
import com.bookstore.repository.OrderRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Controller
@RequestMapping("/api/payment")
public class PaymentController {

    private final VNPayConfig vNPayConfig;
    private final OrderRepository orderRepository;

    public PaymentController(VNPayConfig vNPayConfig, OrderRepository orderRepository) {
        this.vNPayConfig = vNPayConfig;
        this.orderRepository = orderRepository;
    }

    @GetMapping("/vnpay-callback")
    public void vnpayCallback(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map<String, String> fields = new HashMap<>();
        for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements();) {
            String fieldName = params.nextElement();
            String fieldValue = request.getParameter(fieldName);
            if (fieldValue != null && !fieldValue.isEmpty()) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        fields.remove("vnp_SecureHashType");
        fields.remove("vnp_SecureHash");

        // Build hash data
        List<String> fieldNames = new ArrayList<>(fields.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        for (Iterator<String> itr = fieldNames.iterator(); itr.hasNext();) {
            String fieldName = itr.next();
            String fieldValue = fields.get(fieldName);
            hashData.append(fieldName).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.UTF_8.toString()));
            if (itr.hasNext()) {
                hashData.append('&');
            }
        }

        String signValue = VNPayConfig.hmacSHA512(vNPayConfig.getHashSecret(), hashData.toString());
        boolean isSuccess = false;

        if (signValue.equalsIgnoreCase(vnp_SecureHash)) {
            String responseCode = request.getParameter("vnp_ResponseCode");
            String orderId = request.getParameter("vnp_TxnRef");
            
            if ("00".equals(responseCode)) {
                Optional<Order> optionalOrder = orderRepository.findById(orderId);
                if (optionalOrder.isPresent()) {
                    Order order = optionalOrder.get();
                    order.setPaymentStatus("Đã thanh toán");
                    order.setStatus("Đã thanh toán (Chờ chuẩn bị hàng)");
                    orderRepository.save(order);
                    isSuccess = true;
                    System.out.println("Payment successful for order: " + orderId);
                } else {
                    System.out.println("Order not found in database: " + orderId);
                }
            } else {
                System.out.println("Payment failed with response code: " + responseCode);
            }
        } else {
            System.out.println("Invalid VNPay signature!");
            System.out.println("Expected: " + signValue);
            System.out.println("Received: " + vnp_SecureHash);
        }

        if (isSuccess) {
            response.sendRedirect("http://localhost:5173/orders?payment_status=success");
        } else {
            response.sendRedirect("http://localhost:5173/orders?payment_status=failed");
        }
    }
}
