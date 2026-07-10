import { useState } from "react";
import { toast } from "react-toastify";
import "./ForgotPassword.css";
export default function ForgotPassword({ app }) {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function sendOtp() {
    if (isLoading) return;
    setIsLoading(true);

    try {

      const res = await fetch(
        "/api/forgot-password/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Đã gửi OTP");
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Không kết nối được server");
    } finally {
      setIsLoading(false);
    }
  }

 async function verifyOtp() {

  try {

    const res = await fetch(
      "/api/forgot-password/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          otp
        })
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.success === true) {
      toast.success("OTP đúng");
      console.log("OTP SUCCESS");
      setStep(3);
    } else {
      toast.error(data.message || "OTP sai");
    }
  } catch (err) {
    console.log(err);
    toast.error("Lỗi server");
  }
}

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await fetch(
        "/api/forgot-password/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            newPassword
          })
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Đổi mật khẩu thành công");
        setTimeout(() => {
          app.switchPage("login");
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Lỗi server");
    }
  }

  return (
    <div className="page-wrapper">
      <div className="login-shell">
        <aside className="login-brand">
          <div>
            <h1>Khôi phục Mật khẩu</h1>
            <p>Đừng lo lắng, chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào tài khoản của mình nhanh chóng.</p>
          </div>
          <div className="book-list">
            <div className="book-card">
              <div className="book-dot">✓</div>
              <div>
                <strong>Bảo mật an toàn</strong>
                <span>Mã OTP sẽ được gửi trực tiếp đến email của bạn.</span>
              </div>
            </div>
            <div className="book-card">
              <div className="book-dot">!</div>
              <div>
                <strong>Lưu ý quan trọng</strong>
                <span>Mật khẩu mới nên dài hơn 8 ký tự và bao gồm số.</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="login-form">
          <div className="forgot-title" style={{ marginBottom: '24px' }}>
            <h2>Quên mật khẩu</h2>
            <span>
              {step === 1 && "Nhập email đã đăng ký để nhận mã OTP khôi phục mật khẩu."}
              {step === 2 && `Mã xác thực OTP đã được gửi đến email ${email}.`}
              {step === 3 && "Vui lòng đặt lại mật khẩu mới cho tài khoản của bạn."}
            </span>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '2px solid #e0e0e0', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <button
                className="submit-btn"
                onClick={sendOtp}
                disabled={isLoading}
              >
                {isLoading ? "Đang gửi..." : "Gửi OTP"}
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Nhập OTP 6 số"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength="6"
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '2px solid #e0e0e0', outline: 'none', textAlign: 'center', letterSpacing: '8px', fontSize: '1.2rem', fontWeight: 'bold', boxSizing: 'border-box' }}
                />
              </div>
              <button
                className="submit-btn"
                onClick={verifyOtp}
              >
                Xác thực OTP
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '2px solid #e0e0e0', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '2px solid #e0e0e0', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button
                className="submit-btn"
                onClick={resetPassword}
              >
                Đổi mật khẩu
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button type="button" className="link-btn" onClick={() => app.switchPage('login')}>
              Quay lại Đăng nhập
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}