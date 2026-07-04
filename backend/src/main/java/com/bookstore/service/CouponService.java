package com.bookstore.service;

import com.bookstore.model.Coupon;
import com.bookstore.repository.CouponRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CouponService {

    private final CouponRepository couponRepository;

    public CouponService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    public Coupon createCoupon(Coupon coupon) {
        coupon.setCode(coupon.getCode().toUpperCase());
        return couponRepository.save(coupon);
    }

    public Coupon updateCoupon(Long id, Coupon coupon) {

        Coupon old = couponRepository.findById(id).orElse(null);

        if (old == null) {
            return null;
        }

        old.setCode(coupon.getCode().toUpperCase());
        old.setDescription(coupon.getDescription());
        old.setDiscountPercent(coupon.getDiscountPercent());
        old.setMaxDiscount(coupon.getMaxDiscount());
        old.setMinOrderValue(coupon.getMinOrderValue());
        old.setQuantity(coupon.getQuantity());
        old.setStartDate(coupon.getStartDate());
        old.setEndDate(coupon.getEndDate());
        old.setActive(coupon.isActive());

        return couponRepository.save(old);
    }

    public void deleteCoupon(Long id) {
        couponRepository.deleteById(id);
    }

    public Coupon findByCode(String code) {

        Optional<Coupon> optional =
                couponRepository.findByCode(code.toUpperCase());

        return optional.orElse(null);
    }

    public boolean isValid(Coupon coupon, double total) {

        if (coupon == null)
            return false;

        if (!coupon.isActive())
            return false;

        if (coupon.getQuantity() <= 0)
            return false;

        LocalDate today = LocalDate.now();

        if (today.isBefore(coupon.getStartDate()))
            return false;

        if (today.isAfter(coupon.getEndDate()))
            return false;

        return total >= coupon.getMinOrderValue();
    }

    public double calculateDiscount(Coupon coupon, double total) {

        double discount =
                total * coupon.getDiscountPercent() / 100;

        return Math.min(discount, coupon.getMaxDiscount());
    }

    public void decreaseQuantity(Coupon coupon) {

        coupon.setQuantity(coupon.getQuantity() - 1);

        couponRepository.save(coupon);

    }

}