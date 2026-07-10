import React from 'react';
import { Ic, ICONS } from '../AdminIcons';
import './Users.css';

export default function Users({ allUsers, handleUpdateUserRole, handleToggleUserStatus, handleDeleteUser, currentUser }) {
  if (!allUsers || allUsers.length === 0) {
    return (
      <div className="adm-empty-state">
        <div className="adm-empty-icon"><Ic path={ICONS.users} size={48} /></div>
        <p>Không có dữ liệu người dùng</p>
      </div>
    );
  }

  return (
    <div className="adm-users-container">
      <div className="adm-users-header">
        <h2 className="adm-page-title">Quản lý Người dùng</h2>
        <span className="adm-badge">Tổng số: {allUsers.length}</span>
      </div>

      <div className="adm-table-wrapper">
        <table className="adm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Role</th>
              <th>Trạng thái</th>
              <th align="right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td><span className="adm-mono">#{user.id}</span></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || '-'}</td>
                <td>
                  <span className={`adm-role-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                    <span className={`adm-status-badge ${user.active ? 'success' : 'danger'}`}>
                      {user.active ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                    {user.verified ? (
                      <span style={{ fontSize: '0.7rem', color: 'var(--success)' }}>✓ Đã xác thực</span>
                    ) : (
                      <span style={{ fontSize: '0.7rem', color: 'var(--warning)' }}>! Chưa xác thực</span>
                    )}
                  </div>
                </td>
                <td align="right">
                  <div className="adm-actions-group">
                    {currentUser?.email !== user.email && 
                     ((currentUser?.role === 'superadmin' && user.role !== 'superadmin') || 
                      (currentUser?.role === 'admin' && user.role === 'user')) && (
                      <button 
                        className={`adm-text-action-btn ${user.active ? 'danger' : 'success'}`}
                        onClick={() => {
                          if (window.confirm(`Bạn có chắc chắn muốn ${user.active ? 'khóa' : 'mở khóa'} tài khoản ${user.name}?`)) {
                            handleToggleUserStatus(user.id, user.active);
                          }
                        }}
                      >
                        {user.active ? 'Khóa TK' : 'Mở khóa'}
                      </button>
                    )}
                    {currentUser?.role === 'superadmin' && (
                      <button
                        className="adm-text-action-btn danger"
                        onClick={() => handleDeleteUser(user.id)}
                        style={{ marginLeft: '8px', borderLeft: '1px solid #ddd', paddingLeft: '8px' }}
                      >
                        Xóa TK
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
