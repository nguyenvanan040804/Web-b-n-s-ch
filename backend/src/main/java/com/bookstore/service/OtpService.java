package com.bookstore.service;

import com.bookstore.model.OtpToken;
import com.bookstore.repository.OtpTokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    private final OtpTokenRepository otpTokenRepository;
    private final EmailService emailService;

    public OtpService(OtpTokenRepository otpTokenRepository, EmailService emailService) {
        this.otpTokenRepository = otpTokenRepository;
        this.emailService = emailService;
    }

    @Transactional
    public void generateAndSendOtp(String email) {
        // Delete any existing OTP for this email
        otpTokenRepository.deleteByEmail(email);

        // Generate 6-digit OTP
        String otpCode = String.format("%06d", new Random().nextInt(999999));
        long expiryDate = System.currentTimeMillis() + 5 * 60 * 1000; // 5 minutes

        OtpToken otpToken = new OtpToken(email, otpCode, expiryDate);
        otpTokenRepository.save(otpToken);

        // Send email
        emailService.sendOtpEmail(email, otpCode);
    }

    @Transactional
    public void generateRegistrationOtp(String email, String pendingName, String pendingPassword) {
        // Delete any existing OTP for this email
        otpTokenRepository.deleteByEmail(email);

        // Generate 6-digit OTP
        String otpCode = String.format("%06d", new Random().nextInt(999999));
        long expiryDate = System.currentTimeMillis() + 5 * 60 * 1000; // 5 minutes

        OtpToken otpToken = new OtpToken(email, otpCode, expiryDate, pendingName, pendingPassword);
        otpTokenRepository.save(otpToken);

        // Send email
        emailService.sendOtpEmail(email, otpCode);
    }

    @Transactional
    public OtpToken verifyOtp(String email, String otpCode) {
        Optional<OtpToken> optionalOtp = otpTokenRepository.findByEmailAndOtpCode(email, otpCode);
        if (optionalOtp.isPresent()) {
            OtpToken otpToken = optionalOtp.get();
            if (otpToken.getExpiryDate() > System.currentTimeMillis()) {
                // Valid OTP
                otpTokenRepository.deleteByEmail(email);
                return otpToken;
            } else {
                // Expired
                otpTokenRepository.deleteByEmail(email);
                return null;
            }
        }
        return null;
    }
}
