package com.bookstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "otp_tokens")
public class OtpToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String otpCode;
    private long expiryDate;
    
    // Temporary registration fields
    private String pendingName;
    private String pendingPassword;

    public OtpToken() {
    }

    public OtpToken(String email, String otpCode, long expiryDate) {
        this.email = email;
        this.otpCode = otpCode;
        this.expiryDate = expiryDate;
    }

    public OtpToken(String email, String otpCode, long expiryDate, String pendingName, String pendingPassword) {
        this.email = email;
        this.otpCode = otpCode;
        this.expiryDate = expiryDate;
        this.pendingName = pendingName;
        this.pendingPassword = pendingPassword;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }

    public long getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(long expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getPendingName() {
        return pendingName;
    }

    public void setPendingName(String pendingName) {
        this.pendingName = pendingName;
    }

    public String getPendingPassword() {
        return pendingPassword;
    }

    public void setPendingPassword(String pendingPassword) {
        this.pendingPassword = pendingPassword;
    }
}
