package com.bookstore.controller;

import com.bookstore.model.Coupon;
import com.bookstore.repository.CouponRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.bookstore.service.CouponService;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins = "http://localhost:5173")
public class CouponController {

    private final CouponRepository couponRepository;
    private final CouponService couponService;

    public CouponController(CouponRepository couponRepository, CouponService couponService) {
        this.couponRepository = couponRepository;
        this.couponService = couponService;
    }

    @GetMapping
    public ResponseEntity<?> getAllCoupons() {
        return ResponseEntity.ok(couponService.getAllCoupons());
    }

    @PostMapping
    public ResponseEntity<?> createCoupon(@RequestBody Coupon coupon) {
        if (couponRepository.findByCode(coupon.getCode()).isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Mã giảm giá đã tồn tại");
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(couponService.createCoupon(coupon));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoupon(@PathVariable Long id, @RequestBody Coupon coupon) {
        Coupon updated = couponService.updateCoupon(id, coupon);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) {
        couponService.deleteCoupon(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Đã xóa mã giảm giá");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/apply")
    public Map<String, Object> applyCoupon(@RequestBody Map<String, Object> body) {

        Map<String, Object> result = new HashMap<>();

        String code = body.get("code").toString();

        double total =
                Double.parseDouble(body.get("total").toString());

        Optional<Coupon> optionalCoupon =
                couponRepository.findByCode(code);

        if (optionalCoupon.isEmpty()) {

            result.put("success", false);
            result.put("message", "Mã giảm giá không tồn tại");

            return result;
        }

        Coupon coupon = optionalCoupon.get();

        if (!coupon.isActive()) {

            result.put("success", false);
            result.put("message", "Mã giảm giá đã bị khóa");

            return result;
        }

        if (coupon.getQuantity() <= 0) {

            result.put("success", false);
            result.put("message", "Mã giảm giá đã hết lượt");

            return result;
        }

        LocalDate today = LocalDate.now();

        if (today.isBefore(coupon.getStartDate())
                || today.isAfter(coupon.getEndDate())) {

            result.put("success", false);
            result.put("message", "Mã giảm giá đã hết hạn");

            return result;
        }

        if (total < coupon.getMinOrderValue()) {

            result.put("success", false);
            result.put("message",
                    "Đơn hàng tối thiểu "
                            + coupon.getMinOrderValue());

            return result;
        }

        double discount =
                total * coupon.getDiscountPercent() / 100;

        if (discount > coupon.getMaxDiscount()) {

            discount = coupon.getMaxDiscount();
        }

        result.put("success", true);
        result.put("discount", discount);
        result.put("finalTotal", total - discount);
        result.put("message", "Áp dụng thành công");

        return result;
    }
}