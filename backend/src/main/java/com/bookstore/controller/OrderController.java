package com.bookstore.controller;

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

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

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
        
        // Link order items to order for JPA cascade
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setId(null); // Force as new entity (frontend sends book id)
                item.setOrder(order);
            }
        }

        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
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
