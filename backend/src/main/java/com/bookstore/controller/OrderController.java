package com.bookstore.controller;

import com.bookstore.config.VNPayConfig;
import com.bookstore.model.Order;
import com.bookstore.model.OrderItem;
import com.bookstore.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
@Transactional
public class OrderController {

    private final OrderRepository orderRepository;
    private final VNPayConfig vNPayConfig;
    private final com.bookstore.service.EmailService emailService;

    public OrderController(OrderRepository orderRepository, VNPayConfig vNPayConfig, com.bookstore.service.EmailService emailService) {
        this.orderRepository = orderRepository;
        this.vNPayConfig = vNPayConfig;
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Order order) {
        if (order.getId() == null || order.getId().trim().isEmpty()) {
            order.setId("ORD-" + System.currentTimeMillis());
        }
        if (order.getStatus() == null || order.getStatus().trim().isEmpty()) {
            order.setStatus("Chờ chuẩn bị hàng");
        }
        if (order.getPaymentStatus() == null || order.getPaymentStatus().trim().isEmpty()) {
            order.setPaymentStatus("Chưa thanh toán");
        }
        
        // Link order items to order for JPA cascade
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setId(null); // Force as new entity (frontend sends book id)
                item.setOrder(order);
            }
        }

        Order savedOrder = orderRepository.save(order);
        
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("id", savedOrder.getId());
        response.put("date", savedOrder.getDate());
        response.put("userEmail", savedOrder.getUserEmail());
        response.put("items", savedOrder.getItems());
        response.put("total", savedOrder.getTotal());
        response.put("shippingInfo", savedOrder.getShippingInfo());
        response.put("status", savedOrder.getStatus());
        response.put("paymentStatus", savedOrder.getPaymentStatus());

        if (order.getShippingInfo() != null && "VNPAY".equalsIgnoreCase(order.getShippingInfo().getPaymentMethod())) {
            String vnpayUrl = generateVNPayUrl(savedOrder);
            response.put("paymentUrl", vnpayUrl);
        } else {
            // Gửi email xác nhận ngay lập tức cho các phương thức thanh toán không phải VNPay (ví dụ: COD, BANK)
            emailService.sendOrderConfirmationEmail(savedOrder);
        }
        
        return ResponseEntity.ok(response);
    }

    private String generateVNPayUrl(Order order) {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_OrderInfo = "Thanh toan don hang " + order.getId();
        String vnp_OrderType = "billpayment";
        String vnp_TxnRef = order.getId();
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = vNPayConfig.getTmnCode();

        int amount = (int) (order.getTotal() + (order.getTotal() >= 300000 ? 0 : 30000));
        long vnp_Amount = (long) amount * 100; // VNPay expects amount * 100

        java.util.Map<String, String> vnp_Params = new java.util.HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(vnp_Amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", vnp_OrderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vNPayConfig.getReturnUrl());
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        java.util.Calendar cld = java.util.Calendar.getInstance(java.util.TimeZone.getTimeZone("Etc/GMT+7"));
        java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        java.util.List<String> fieldNames = new java.util.ArrayList<>(vnp_Params.keySet());
        java.util.Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (String fieldName : fieldNames) {
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && !fieldValue.isEmpty()) {
                if (hashData.length() > 0) {
                    hashData.append('&');
                    query.append('&');
                }
                try {
                    hashData.append(fieldName).append('=').append(java.net.URLEncoder.encode(fieldValue, java.nio.charset.StandardCharsets.UTF_8.toString()));
                    query.append(java.net.URLEncoder.encode(fieldName, java.nio.charset.StandardCharsets.UTF_8.toString()))
                         .append('=')
                         .append(java.net.URLEncoder.encode(fieldValue, java.nio.charset.StandardCharsets.UTF_8.toString()));
                } catch (java.io.UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = com.bookstore.config.VNPayConfig.hmacSHA512(vNPayConfig.getHashSecret(), hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        return vNPayConfig.getPayUrl() + "?" + queryUrl;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(@RequestParam(value = "email", required = false) String email) {
        if (email != null && !email.trim().isEmpty()) {
            return ResponseEntity.ok(orderRepository.findByUserEmail(email));
        }
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable("id") String id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        if (newStatus == null || newStatus.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Trạng thái không hợp lệ."));
        }

        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order o = optionalOrder.get();
            o.setStatus(newStatus);
            orderRepository.save(o);
            return ResponseEntity.ok(o);
        }
        
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/pay")
    public ResponseEntity<?> payOrder(@PathVariable("id") String id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order o = optionalOrder.get();
            o.setPaymentStatus("Đã thanh toán");
            o.setStatus("Đã thanh toán (Chờ chuẩn bị hàng)");
            orderRepository.save(o);
            return ResponseEntity.ok(o);
        }
        
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") String id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            orderRepository.delete(optionalOrder.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
