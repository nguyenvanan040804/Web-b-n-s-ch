import React, { useState } from 'react';
import './Coupons.css';
import { Ic, ICONS } from '../AdminIcons';

export default function Coupons({ app }) {
  const { allCoupons = [], handleCreateCoupon, handleUpdateCoupon, handleDeleteCoupon } = app;
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    code: '',
    description: '',
    discountPercent: 0,
    minOrderValue: 0,
    maxDiscount: 0,
    quantity: 0,
    startDate: '',
    endDate: '',
    active: true
  });

  const openAddModal = () => {
    setFormData({
      id: null,
      code: '',
      description: '',
      discountPercent: 0,
      minOrderValue: 0,
      maxDiscount: 0,
      quantity: 0,
      startDate: '',
      endDate: '',
      active: true
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (coupon) => {
    setFormData({ ...coupon });
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const success = await handleUpdateCoupon(formData.id, formData);
      if (success) closeModal();
    } else {
      const success = await handleCreateCoupon(formData);
      if (success) closeModal();
    }
  };

  const handleDelete = async (id, code) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa mã giảm giá ${code}?`)) {
      await handleDeleteCoupon(id);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="coupons-container">
      <div className="coupons-header">
        <h3>Quản lý Mã Giảm Giá</h3>
        <button className="add-coupon-btn" onClick={openAddModal}>
          <Ic path={ICONS.plus} size={18} /> Thêm Voucher
        </button>
      </div>

      <div className="adm-table-wrapper">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Mã Code</th>
              <th>Giảm giá</th>
              <th>Điều kiện</th>
              <th>Thời hạn</th>
              <th>Số lượng</th>
              <th>Trạng thái</th>
              <th align="right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {allCoupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>
                  <span className="coupon-code">{coupon.code}</span>
                  <div className="coupon-desc">{coupon.description}</div>
                </td>
                <td>
                  <strong>{coupon.discountPercent}%</strong><br/>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Tối đa: {formatCurrency(coupon.maxDiscount)}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.85rem' }}>Đơn tối thiểu:</span><br/>
                  <strong>{formatCurrency(coupon.minOrderValue)}</strong>
                </td>
                <td>
                  <span style={{ fontSize: '0.85rem' }}>Từ: {coupon.startDate}</span><br/>
                  <span style={{ fontSize: '0.85rem' }}>Đến: {coupon.endDate}</span>
                </td>
                <td><strong>{coupon.quantity}</strong></td>
                <td>
                  <span className={`coupon-status ${coupon.active ? 'active' : 'inactive'}`}>
                    {coupon.active ? 'Đang kích hoạt' : 'Đã khóa'}
                  </span>
                </td>
                <td align="right" className="coupon-actions">
                  <button onClick={() => openEditModal(coupon)}>Sửa</button>
                  <button className="delete" onClick={() => handleDelete(coupon.id, coupon.code)}>Xóa</button>
                </td>
              </tr>
            ))}
            {allCoupons.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                  Chưa có mã giảm giá nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="coupon-modal-overlay">
          <div className="coupon-modal">
            <h4>{isEditing ? 'Cập nhật Mã Giảm Giá' : 'Thêm Mã Giảm Giá Mới'}</h4>
            <form onSubmit={handleSubmit}>
              <div className="coupon-form-group">
                <label>Mã Code (Tối đa 20 ký tự)</label>
                <input 
                  type="text" 
                  value={formData.code} 
                  onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  required 
                  disabled={isEditing}
                />
              </div>
              <div className="coupon-form-group">
                <label>Mô tả ngắn</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required 
                ></textarea>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="coupon-form-group">
                  <label>Phần trăm giảm (%)</label>
                  <input 
                    type="number" 
                    value={formData.discountPercent} 
                    onChange={e => setFormData({...formData, discountPercent: Number(e.target.value)})}
                    required 
                    min="1" max="100"
                  />
                </div>
                <div className="coupon-form-group">
                  <label>Giảm tối đa (VNĐ)</label>
                  <input 
                    type="number" 
                    value={formData.maxDiscount} 
                    onChange={e => setFormData({...formData, maxDiscount: Number(e.target.value)})}
                    required 
                    min="0"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="coupon-form-group">
                  <label>Đơn tối thiểu (VNĐ)</label>
                  <input 
                    type="number" 
                    value={formData.minOrderValue} 
                    onChange={e => setFormData({...formData, minOrderValue: Number(e.target.value)})}
                    required 
                    min="0"
                  />
                </div>
                <div className="coupon-form-group">
                  <label>Số lượng phát hành</label>
                  <input 
                    type="number" 
                    value={formData.quantity} 
                    onChange={e => setFormData({...formData, quantity: Number(e.target.value)})}
                    required 
                    min="1"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="coupon-form-group">
                  <label>Ngày bắt đầu</label>
                  <input 
                    type="date" 
                    value={formData.startDate} 
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                    required 
                  />
                </div>
                <div className="coupon-form-group">
                  <label>Ngày kết thúc</label>
                  <input 
                    type="date" 
                    value={formData.endDate} 
                    onChange={e => setFormData({...formData, endDate: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="coupon-form-group checkbox">
                <input 
                  type="checkbox" 
                  id="active"
                  checked={formData.active} 
                  onChange={e => setFormData({...formData, active: e.target.checked})}
                />
                <label htmlFor="active" style={{ marginBottom: 0 }}>Kích hoạt ngay</label>
              </div>

              <div className="coupon-modal-actions">
                <button type="button" className="coupon-btn-cancel" onClick={closeModal}>Hủy</button>
                <button type="submit" className="coupon-btn-save">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
