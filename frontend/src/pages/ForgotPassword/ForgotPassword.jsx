import React, { useState } from 'react';
import './ForgotPassword.css';

export default function ForgotPassword({ app }) {

  const { switchPage } = app;

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendOtp(e) {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setStep(2);
      } else {
        setMessage(data.message);
      }

    } catch (err) {
      setMessage('Không thể kết nối server');
    }

    setLoading(false);
  }

  async function resetPassword(e) {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {

      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);

        setTimeout(() => {
          switchPage('login');
        }, 2000);

      } else {
        setMessage(data.message);
      }

    } catch (err) {
      setMessage('Không thể kết nối server');
    }

    setLoading(false);
  }

  return (
    <div className="forgot-container">

      <div className="forgot-card">

        <h1>Quên mật khẩu</h1>

        {step === 1 && (
          <form onSubmit={sendOtp}>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit">
              {loading ? 'Đang gửi...' : 'Gửi OTP'}
            </button>

          </form>
        )}

        {step === 2 && (
          <form onSubmit={resetPassword}>

            <div className="form-group">
              <label>OTP</label>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu mới</label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">
              {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
            </button>

          </form>
        )}

        {message && (
          <div className="message-box">
            {message}
          </div>
        )}

        <button
          className="back-btn"
          onClick={() => switchPage('login')}
        >
          Quay lại đăng nhập
        </button>

      </div>

    </div>
  );
}