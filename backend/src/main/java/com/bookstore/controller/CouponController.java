package com.bookstore.controller;

import com.bookstore.model.Coupon;
import com.bookstore.repository.CouponRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins = "http://localhost:5173")
public class CouponController {

    private final CouponRepository couponRepository;

    public CouponController(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
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