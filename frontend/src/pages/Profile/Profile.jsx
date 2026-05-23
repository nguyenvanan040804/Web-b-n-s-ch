import React, { useState } from 'react';
import './Profile.css';

export default function Profile({ app }) {
  const { user, handleUpdateProfile } = app;

  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <main className="profile-panel">
        <div className="profile-unauth-card">
          <h2>Vui lòng đăng nhập</h2>
          <p>Bạn cần đăng nhập tài khoản để có thể xem và quản lý hồ sơ cá nhân.</p>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password && password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    try {
      const response = await handleUpdateProfile({
        name,
        email: user.email,
        password: password || undefined,
        phone,
        address
      });

      if (response && response.success) {
        setSuccess('Cập nhật thông tin tài khoản thành công!');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(response?.message || 'Có lỗi xảy ra khi cập nhật.');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="profile-panel">
      <div className="profile-container">
        <div className="profile-header-sec">
          <h2>Hồ sơ cá nhân</h2>
          <p>Cập nhật thông tin giao hàng mặc định và thông tin bảo mật tài khoản.</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form-grid">
          <div className="profile-left-col">
            <h3>Thông tin liên hệ & Giao hàng</h3>
            
            <div className="form-group">
              <label htmlFor="profile-email">Địa chỉ Email (Không thể thay đổi)</label>
              <input
                id="profile-email"
                type="email"
                disabled
                value={user.email}
                className="disabled-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-name">Họ và tên</label>
              <input
                id="profile-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ tên của bạn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-phone">Số điện thoại liên hệ</label>
              <input
                id="profile-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại giao hàng"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-address">Địa chỉ giao hàng mặc định</label>
              <textarea
                id="profile-address"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Số nhà, ngõ ngách, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
              ></textarea>
            </div>
          </div>

          <div className="profile-right-col">
            <h3>Bảo mật tài khoản</h3>
            <p className="security-tip">Để trống nếu bạn không muốn thay đổi mật khẩu hiện tại.</p>

            <div className="form-group">
              <label htmlFor="profile-password">Mật khẩu mới</label>
              <input
                id="profile-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-confirm-password">Xác nhận mật khẩu mới</label>
              <input
                id="profile-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>

            {error && <div className="profile-alert error">{error}</div>}
            {success && <div className="profile-alert success">{success}</div>}

            <button type="submit" className="profile-save-btn" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
