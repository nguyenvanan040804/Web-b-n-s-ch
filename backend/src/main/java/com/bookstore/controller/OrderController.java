package com.bookstore.controller;

import com.bookstore.model.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final List<Order> orders = new CopyOnWriteArrayList<>();

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        if (order.getId() == null || order.getId().trim().isEmpty()) {
            order.setId("ORD-" + System.currentTimeMillis());
        }
        if (order.getStatus() == null || order.getStatus().trim().isEmpty()) {
            order.setStatus("Chờ chuẩn bị hàng");
        }
        if (order.getPaymentStatus() == null || order.getPaymentStatus().trim().isEmpty()) {
            order.setPaymentStatus("Chưa thanh toán");
        }
        orders.add(0, order); // insert at start of list
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(@RequestParam(value = "email", required = false) String email) {
        if (email != null && !email.trim().isEmpty()) {
            List<Order> userOrders = orders.stream()
                    .filter(o -> email.equalsIgnoreCase(o.getUserEmail()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(userOrders);
        }
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable("id") String id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        if (newStatus == null || newStatus.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Trạng thái không hợp lệ."));
        }

        for (Order o : orders) {
            if (o.getId().equalsIgnoreCase(id)) {
                o.setStatus(newStatus);
                return ResponseEntity.ok(o);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/pay")
    public ResponseEntity<?> payOrder(@PathVariable("id") String id) {
        for (Order o : orders) {
            if (o.getId().equalsIgnoreCase(id)) {
                o.setPaymentStatus("Đã thanh toán");
                o.setStatus("Đã thanh toán (Chờ chuẩn bị hàng)");
                return ResponseEntity.ok(o);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
