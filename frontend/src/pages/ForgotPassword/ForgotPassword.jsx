import { useState } from "react";
import "./ForgotPassword.css";
export default function ForgotPassword({ app }) {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState(1);

  const [message, setMessage] = useState("");

  async function sendOtp() {

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

        setMessage("Đã gửi OTP");
        setStep(2);

      } else {

        setMessage(data.message);
      }

    } catch (err) {

      setMessage("Không kết nối được server");
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

      setMessage("OTP đúng");

      console.log("OTP SUCCESS");

      setStep(3);

    } else {

      setMessage(data.message || "OTP sai");
    }

  } catch (err) {

    console.log(err);

    setMessage("Lỗi server");
  }
}

  async function resetPassword() {

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

  setMessage("Đổi mật khẩu thành công");

  setTimeout(() => {

    app.switchPage("login");

  }, 1500);

} else {

        setMessage(data.message);
      }

    } catch (err) {

      setMessage("Lỗi server");
    }
  }

  return (

    <div className="page-wrapper">

      <div className="login-shell">

        <section className="login-form">

          <div className="forgot-title">
  <h2>Quên mật khẩu</h2>

  <span>
    Nhập email để nhận mã OTP và đặt lại mật khẩu.
  </span>
</div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
  className="submit-btn"
  onClick={sendOtp}
>
                Gửi OTP
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Nhập OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
  className="submit-btn"
  onClick={verifyOtp}
>
                Xác thực OTP
              </button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
  className="submit-btn"
  onClick={resetPassword}
>
                Đổi mật khẩu
              </button>
            </>
          )}

          {message && (
  <div className="message-box">
    {message}
  </div>
)}

        </section>

      </div>

    </div>
  );
}