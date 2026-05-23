package com.bookstore.model;

import java.util.List;

public class Order {
    private String id;
    private String date;
    private String userEmail;
    private List<OrderItem> items;
    private double total;
    private ShippingInfo shippingInfo;
    private String status;
    private String paymentStatus;

    public Order() {
        this.paymentStatus = "Chưa thanh toán";
    }

    public Order(String id, String date, String userEmail, List<OrderItem> items, double total, ShippingInfo shippingInfo, String status) {
        this.id = id;
        this.date = date;
        this.userEmail = userEmail;
        this.items = items;
        this.total = total;
        this.shippingInfo = shippingInfo;
        this.status = status;
        this.paymentStatus = "Chưa thanh toán";
    }

    public Order(String id, String date, String userEmail, List<OrderItem> items, double total, ShippingInfo shippingInfo, String status, String paymentStatus) {
        this.id = id;
        this.date = date;
        this.userEmail = userEmail;
        this.items = items;
        this.total = total;
        this.shippingInfo = shippingInfo;
        this.status = status;
        this.paymentStatus = paymentStatus == null ? "Chưa thanh toán" : paymentStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public ShippingInfo getShippingInfo() {
        return shippingInfo;
    }

    public void setShippingInfo(ShippingInfo shippingInfo) {
        this.shippingInfo = shippingInfo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
