package com.bookstore.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;

    private String role;

    private String phone;

    private String address;

    private boolean isVerified;

    private String authProvider; // LOCAL or GOOGLE
    private boolean isActive;

    private boolean isActive;

    public User() {
        this.role = "user";
        this.phone = "";
        this.address = "";
        this.isVerified = false;
        this.authProvider = "LOCAL";
        this.isActive = true;
    }

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = "user";
        this.phone = "";
        this.address = "";
        this.isVerified = false;
        this.authProvider = "LOCAL";
        this.isActive = true;
    }

    public User(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role == null ? "user" : role;
        this.phone = "";
        this.address = "";
        this.isVerified = false;
        this.authProvider = "LOCAL";
        this.isActive = true;
    }

    public User(String name, String email, String password, String role, String phone, String address) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role == null ? "user" : role;
        this.phone = phone;
        this.address = address;
        this.isVerified = true;
        this.authProvider = "LOCAL";
        this.isActive = true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        this.isVerified = verified;
    }

    public String getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(String authProvider) {
        this.authProvider = authProvider;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        this.isActive = active;
    }
}
}