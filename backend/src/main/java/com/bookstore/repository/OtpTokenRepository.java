package com.bookstore.repository;

import com.bookstore.model.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {
    Optional<OtpToken> findByEmailAndOtpCode(String email, String otpCode);
    void deleteByEmail(String email);
}
