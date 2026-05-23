import React from 'react';
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
    switchPage
  } = app;

  return (
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
            <p>{page === 'login' ? 'Nhập email và mật khẩu của bạn để truy cập vào hệ thống bán sách trực tuyến.' : 'Hoàn tất các thông tin sau để đăng ký tài khoản Nhà Sách.'}</p>
          </div>

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
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            {page === 'register' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  required
                />
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

          <p className="footer-note">Chúng tôi cam kết bảo mật thông tin cá nhân và hỗ trợ bạn mọi lúc.</p>

          {message && <div className="message-box">{message}</div>}
        </section>
      </div>
    </div>
  );
}
