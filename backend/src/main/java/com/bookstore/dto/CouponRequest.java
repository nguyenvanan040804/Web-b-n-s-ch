package com.bookstore.dto;

public class CouponRequest {

    private String code;
    private double total;

    public CouponRequest() {
    }

    public CouponRequest(String code, double total) {
        this.code = code;
        this.total = total;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}