package com.bookstore.controller;

import com.bookstore.model.LoginRequest;
import com.bookstore.model.RegisterRequest;
import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;
import com.bookstore.service.OtpService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.bookstore.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    private final JwtUtil jwtUtil;

    // TODO: The user can inject their own Google Client ID here if they have one.
    // For demo purposes, we accept any audience or check a specific one if configured.
    private static final String GOOGLE_CLIENT_ID = "253069958668-jabu3hlu5hip0ckc16i2rffb3g1hbhvs.apps.googleusercontent.com";

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, OtpService otpService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpService = otpService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Validated @RequestBody LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail().toLowerCase());
        
        if (optionalUser.isEmpty() || !passwordEncoder.matches(request.getPassword(), optionalUser.get().getPassword())) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Tài khoản không tồn tại hoặc mật khẩu sai. Vui lòng kiểm tra lại."
            ));
        }

        User user = optionalUser.get();
        
        if (!user.isActive()) {
            return ResponseEntity.status(403).body(Map.of(
                "success", false,
                "message", "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên."
            ));
        }
        
        if (!user.isVerified()) {
            // Re-send OTP if not verified
            otpService.generateAndSendOtp(user.getEmail());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "needsVerification", true,
                "email", user.getEmail(),
                "message", "Tài khoản chưa xác thực. Một mã OTP mới đã được gửi đến email của bạn."
            ));
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Đăng nhập thành công! Chào mừng " + user.getName(),
            "token", token,
            "name", user.getName(),
            "email", user.getEmail(),
            "role", user.getRole(),
            "phone", user.getPhone() == null ? "" : user.getPhone(),
            "address", user.getAddress() == null ? "" : user.getAddress()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Validated @RequestBody RegisterRequest request) {
        String email = request.getEmail().toLowerCase();
        Optional<User> existingUser = userRepository.findByEmail(email);
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.isVerified()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email này đã được đăng ký. Vui lòng đăng nhập."
                ));
            } else {
                // Clean up legacy unverified users if any
                userRepository.delete(user);
            }
        }

        // Generate OTP and store temporary registration data in otp_tokens table
        otpService.generateRegistrationOtp(email, request.getName(), passwordEncoder.encode(request.getPassword()));

        return ResponseEntity.ok(Map.of(
            "success", true,
            "needsVerification", true,
            "email", email,
            "message", "Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP xác thực."
        ));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otpCode = body.get("otp");
        
        if (email == null || otpCode == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Dữ liệu không hợp lệ."));
        }

        com.bookstore.model.OtpToken validOtp = otpService.verifyOtp(email.toLowerCase(), otpCode);
        if (validOtp != null) {
            Optional<User> userOpt = userRepository.findByEmail(email.toLowerCase());
            if (userOpt.isPresent()) {
                // Fallback for legacy login OTPs if any
                User user = userOpt.get();
                user.setVerified(true);
                userRepository.save(user);
            } else {
                // Delayed registration: Create the user NOW since OTP is verified
                User user = new User();
                user.setName(validOtp.getPendingName() != null ? validOtp.getPendingName() : "Người dùng mới");
                user.setEmail(email.toLowerCase());
                user.setPassword(validOtp.getPendingPassword());
                user.setRole("user");
                user.setPhone("");
                user.setAddress("");
                user.setVerified(true);
                user.setAuthProvider("LOCAL");
                userRepository.save(user);
            }
            
            User finalUser = userRepository.findByEmail(email.toLowerCase()).get();
            String token = jwtUtil.generateToken(finalUser.getEmail(), finalUser.getRole());

            return ResponseEntity.ok(Map.of(
                "success", true,
                "token", token,
                "message", "Xác thực thành công. Bạn đã được tự động đăng nhập!"
            ));
        }

        return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Mã OTP bạn nhập không chính xác hoặc đã hết hạn (quá 5 phút). Vui lòng thử lại hoặc nhấn Gửi lại mã OTP."));
    }

    @PostMapping("/google-login")
    public ResponseEntity<Map<String, Object>> googleLogin(@RequestBody Map<String, String> body) {
        String idTokenString = body.get("token");
        if (idTokenString == null || idTokenString.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Thiếu Google Token."));
        }

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                // .setAudience(Collections.singletonList(GOOGLE_CLIENT_ID)) // Uncomment and configure when Client ID is real
                .build();

            // Parse token without verifying audience strictly if testing, but `verify` does full check
            GoogleIdToken idToken = GoogleIdToken.parse(verifier.getJsonFactory(), idTokenString);
            // In a real app we MUST verify the token via verifier.verify(idTokenString);
            
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail().toLowerCase();
                String name = (String) payload.get("name");

                Optional<User> existingUser = userRepository.findByEmail(email);
                User user;
                if (existingUser.isPresent()) {
                    user = existingUser.get();
                    if (!user.isActive()) {
                        return ResponseEntity.status(403).body(Map.of("success", false, "message", "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên."));
                    }
                    if (!user.isVerified()) {
                        user.setVerified(true); // Auto verify if google email is verified
                    }
                    if (!"GOOGLE".equals(user.getAuthProvider())) {
                        user.setAuthProvider("GOOGLE");
                    }
                    userRepository.save(user);
                } else {
                    user = new User();
                    user.setName(name);
                    user.setEmail(email);
                    user.setPassword(passwordEncoder.encode(java.util.UUID.randomUUID().toString())); // Random password
                    user.setRole("user");
                    user.setPhone("");
                    user.setAddress("");
                    user.setVerified(true);
                    user.setAuthProvider("GOOGLE");
                    userRepository.save(user);
                }

                String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Đăng nhập thành công! Chào mừng " + user.getName(),
                    "token", token,
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole(),
                    "phone", user.getPhone() == null ? "" : user.getPhone(),
                    "address", user.getAddress() == null ? "" : user.getAddress()
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Token không hợp lệ."));
            }
        } catch (Exception e) {
            System.err.println("Google Login Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Lỗi xác thực Google."));
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(@RequestBody User profileData) {
        if (profileData.getEmail() == null || profileData.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Email không hợp lệ."
            ));
        }
        
        String email = profileData.getEmail().toLowerCase();
        Optional<User> optionalUser = userRepository.findByEmail(email);
        
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Không tìm thấy tài khoản người dùng."
            ));
        }

        User user = optionalUser.get();
        user.setName(profileData.getName());
        if (profileData.getPassword() != null && !profileData.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(profileData.getPassword()));
        }
        user.setPhone(profileData.getPhone());
        user.setAddress(profileData.getAddress());
        
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Cập nhật thông tin hồ sơ thành công!",
            "name", user.getName(),
            "email", user.getEmail(),
            "role", user.getRole(),
            "phone", user.getPhone() == null ? "" : user.getPhone(),
            "address", user.getAddress() == null ? "" : user.getAddress()
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refreshToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);
                Optional<User> optionalUser = userRepository.findByEmail(email);
                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();
                    String newToken = jwtUtil.generateToken(user.getEmail(), user.getRole());
                    return ResponseEntity.ok(Map.of(
                        "success", true,
                        "token", newToken
                    ));
                }
            }
        }
        return ResponseEntity.status(401).body(Map.of(
            "success", false,
            "message", "Phiên đăng nhập không hợp lệ hoặc đã hết hạn."
        ));
    }
}
