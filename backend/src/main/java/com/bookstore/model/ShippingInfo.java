package com.bookstore.model;

public class ShippingInfo {
    private String name;
    private String phone;
    private String address;
    private String note;
    private String paymentMethod;

    public ShippingInfo() {
    }

    public ShippingInfo(String name, String phone, String address, String note, String paymentMethod) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.note = note;
        this.paymentMethod = paymentMethod;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
