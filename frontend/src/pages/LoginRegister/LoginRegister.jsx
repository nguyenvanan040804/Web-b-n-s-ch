import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './LoginRegister.css';

export default function LoginRegister({ app }) {
  const {
    page,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    remember,
    setRemember,
    loading,
    message,
    handleLogin,
    handleRegister,
    switchPage,
    verifyOtpEmail,
    otpCode,
    setOtpCode,
    handleVerifyOtp,
    handleGoogleLogin
  } = app;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    let interval = null;
    if (verifyOtpEmail && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [verifyOtpEmail, resendTimer]);

  const handleResendClick = (e) => {
    e.preventDefault();
    if (resendTimer === 0) {
      setResendTimer(60);
      handleRegister(e);
    }
  };

  // TODO: Insert your actual Google Client ID here
  const GOOGLE_CLIENT_ID = "253069958668-jabu3hlu5hip0ckc16i2rffb3g1hbhvs.apps.googleusercontent.com";

  const EyeIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
    </svg>
  );

  if (verifyOtpEmail) {
    return (
      <div className="page-wrapper">
        <div className="login-shell" style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }}>
          <section className="login-form" style={{ borderRadius: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2>Xác thực OTP</h2>
              <p>Mã xác thực 6 số đã được gửi đến email <strong>{verifyOtpEmail}</strong>. Vui lòng kiểm tra email của bạn.</p>
            </div>
            <form onSubmit={handleVerifyOtp} style={{ marginTop: '20px' }}>
              <div className="form-group">
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Nhập mã OTP (VD: 123456)"
                  maxLength="6"
                  style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem', fontWeight: 'bold' }}
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading || otpCode.length !== 6}>
                {loading ? 'Đang xử lý...' : 'Xác nhận OTP'}
              </button>
              <button 
                type="button" 
                className="submit-btn" 
                style={{ 
                  marginTop: '12px', 
                  backgroundColor: resendTimer > 0 ? '#e0e0e0' : '#4a90e2', 
                  color: resendTimer > 0 ? '#888' : '#fff',
                  cursor: resendTimer > 0 ? 'not-allowed' : 'pointer'
                }} 
                onClick={handleResendClick} 
                disabled={resendTimer > 0 || loading}
              >
                {resendTimer > 0 ? `Gửi lại mã OTP (${resendTimer}s)` : 'Gửi lại mã OTP'}
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="page-wrapper">
        <div className="login-shell">
          <aside className="login-brand">
            <div>
              <h1>Nhà Sách</h1>
              <p>{page === 'login' ? 'Đăng nhập để tiếp tục mua sách, quản lý đơn hàng và nhận ưu đãi mới nhất.' : 'Tạo tài khoản mới để khám phá sách hay và nhận ưu đãi cá nhân.'}</p>
            </div>

            <div className="book-list">
              <div className="book-card">
                <div className="book-dot">1</div>
                <div>
                  <strong>Kho sách đa dạng</strong>
                  <span>Tiểu thuyết, kinh doanh, kỹ năng, thiếu nhi...</span>
                </div>
              </div>
              <div className="book-card">
                <div className="book-dot">2</div>
                <div>
                  <strong>Giảm giá hàng tuần</strong>
                  <span>Ưu đãi sách hay, giảm đến 50% mỗi tuần.</span>
                </div>
              </div>
              <div className="book-card">
                <div className="book-dot">3</div>
                <div>
                  <strong>Giao hàng nhanh</strong>
                  <span>Nhận hàng tận nơi trong 1-3 ngày làm việc.</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="login-form">
            <div>
              <h2>{page === 'login' ? 'Đăng nhập tài khoản' : 'Tạo tài khoản mới'}</h2>
            </div>

            {page === 'login' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      handleGoogleLogin(credentialResponse.credential);
                    }}
                    onError={() => {
                      console.error('Đăng nhập Google thất bại');
                    }}
                    text="signin_with"
                  />
                </div>
                <div className="divider" style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem', position: 'relative', margin: '16px 0' }}>
                  <span style={{ background: '#fff', padding: '0 10px', position: 'relative', zIndex: 1 }}>HOẶC BẰNG EMAIL</span>
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid #ddd', zIndex: 0 }}></div>
                </div>
              </>
            )}

            <form onSubmit={page === 'login' ? handleLogin : handleRegister}>
              {page === 'register' && (
                <div className="form-group">
                  <label htmlFor="name">Họ và tên</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Nhập họ tên"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@bookstore.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {page === 'register' && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                  <div className="password-input-wrapper">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>
              )}

              {page === 'login' && (
                <div className="actions">
                  <label className="remember">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                    />
                    Nhớ đăng nhập
                  </label>
                  <a href="#">Quên mật khẩu?</a>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Đang xử lý...' : page === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            </form>

            <div className="hint">
              {page === 'login' ? (
                <>
                  <span>Chưa có tài khoản?</span>
                  <button type="button" className="link-btn" onClick={() => switchPage('register')}>
                    Đăng ký ngay
                  </button>
                </>
              ) : (
                <>
                  <span>Đã có tài khoản?</span>
                  <button type="button" className="link-btn" onClick={() => switchPage('login')}>
                    Đăng nhập
                  </button>
                </>
              )}
            </div>

          </section>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
