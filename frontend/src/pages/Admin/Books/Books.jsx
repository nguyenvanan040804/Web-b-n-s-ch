import React, { useState } from 'react';
import { Ic, ICONS } from '../AdminIcons';
import './Books.css';

/**
 * Books — Tab Quản lý Sách
 * Props: books, handleDeleteBook, setAdminTab
 */
export default function Books({ books, handleDeleteBook, handleUpdateBook, setAdminTab }) {
  const [bookSearch, setBookSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  
  const [editingBook, setEditingBook] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editCoverFile, setEditCoverFile] = useState(null);

  const openEditModal = (book) => {
    setEditFormData({ ...book });
    setEditCoverFile(null);
    setEditingBook(book);
  };

  const closeEditModal = () => {
    setEditingBook(null);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (handleUpdateBook) {
      const success = await handleUpdateBook(editingBook.id, editFormData, editCoverFile);
      if (success) {
        closeEditModal();
      }
    }
  };

    const filteredBooks = [...books].sort((a, b) => b.id - a.id).filter(b =>
    b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.author.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {/* Section header */}
      <div className="adm-section-header">
        <div>
          <h3>Danh sách Sách</h3>
          <p>Toàn bộ {books.length} đầu sách đang có trong hệ thống cửa hàng.</p>
        </div>
        <div className="adm-section-actions">
          <div className="adm-search-box">
            <Ic path={ICONS.search} size={15} />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc tác giả..."
              value={bookSearch}
              onChange={e => { setBookSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <button className="adm-btn-primary" onClick={() => setAdminTab('add-book')}>
            <Ic path={ICONS.plus} size={16} /> Thêm sách mới
          </button>
        </div>
      </div>

      {/* Books table */}
      <div className="adm-card adm-no-pad">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 56 }}>Bìa</th>
                <th>Tiêu đề &amp; Tác giả</th>
                <th>Thể loại</th>
                <th>Giá bán</th>
                <th>Nhà XB</th>
                <th>Lượt bán</th>
                <th style={{ width: 90 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                    {bookSearch
                      ? `Không tìm thấy sách phù hợp với từ khóa "${bookSearch}".`
                      : 'Chưa có sách nào trong hệ thống.'}
                  </td>
                </tr>
              ) : currentBooks.map(book => (
                <tr key={book.id}>
                  <td>
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="adm-book-thumb"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=80'; }}
                    />
                  </td>
                  <td>
                    <div className="adm-book-title">{book.title}</div>
                    <div className="adm-sub">{book.author}</div>
                  </td>
                  <td><span className="adm-cat-pill">{book.category}</span></td>
                  <td><strong>{book.price.toLocaleString('vi-VN')} đ</strong></td>
                  <td className="adm-sub">{book.publisher || '—'}</td>
                  <td>
                    <div className="adm-sales-badge">
                      <Ic path={ICONS.star} size={12} /> {book.salesCount || 0}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="adm-btn-primary"
                        style={{ padding: '4px 8px', fontSize: '0.8rem', background: '#3b82f6', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}
                        title="Sửa sách"
                        onClick={() => openEditModal(book)}
                      >
                        Sửa
                      </button>
                      <button
                        className="adm-danger-btn"
                        title="Xóa sách"
                        onClick={() => {
                          if (window.confirm(`Xác nhận xóa sách "${book.title}"?`)) {
                            if (handleDeleteBook) handleDeleteBook(book.id);
                          }
                        }}
                      >
                        <Ic path={ICONS.trash} size={13} /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '16px' }}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              style={{ padding: '6px 12px', border: '1px solid #ddd', borderRadius: '4px', background: currentPage === 1 ? '#f1f5f9' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#94a3b8' : '#333' }}
            >
              Trước
            </button>
            <span style={{ fontSize: '14px', color: '#475569' }}>
              Trang {currentPage} / {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              style={{ padding: '6px 12px', border: '1px solid #ddd', borderRadius: '4px', background: currentPage === totalPages ? '#f1f5f9' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#94a3b8' : '#333' }}
            >
              Tiếp
            </button>
          </div>
        )}
      </div>

      {editingBook && (
        <div className="book-modal-overlay">
          <div className="book-modal">
            <h4>Cập nhật Thông tin Sách</h4>
            <form onSubmit={submitEdit} className="book-modal-form">
              <div className="form-group">
                <label>Tiêu đề sách</label>
                <input 
                  type="text" 
                  value={editFormData.title} 
                  onChange={e => setEditFormData({...editFormData, title: e.target.value})}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Tác giả</label>
                <input 
                  type="text" 
                  value={editFormData.author} 
                  onChange={e => setEditFormData({...editFormData, author: e.target.value})}
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Thể loại</label>
                  <select 
                    value={editFormData.category} 
                    onChange={e => setEditFormData({...editFormData, category: e.target.value})}
                  >
                    <option value="Tiểu thuyết">Tiểu thuyết</option>
                    <option value="Kỹ năng">Kỹ năng</option>
                    <option value="Kinh tế">Kinh tế</option>
                    <option value="Thiếu nhi">Thiếu nhi</option>
                    <option value="Khoa học">Khoa học</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Giá tiền (VND)</label>
                  <input 
                    type="number" 
                    value={editFormData.price} 
                    onChange={e => setEditFormData({...editFormData, price: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Ảnh bìa mới (Để trống nếu giữ ảnh cũ)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setEditCoverFile(e.target.files[0]);
                    }
                  }}
                />
                {editCoverFile && <p style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>Đã chọn: {editCoverFile.name}</p>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Nhà xuất bản</label>
                  <input 
                    type="text" 
                    value={editFormData.publisher || ''} 
                    onChange={e => setEditFormData({...editFormData, publisher: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Số trang</label>
                  <input 
                    type="number" 
                    value={editFormData.pages || 0} 
                    onChange={e => setEditFormData({...editFormData, pages: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Khối lượng (g)</label>
                  <input 
                    type="number" 
                    value={editFormData.weight || 350} 
                    onChange={e => setEditFormData({...editFormData, weight: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả nội dung</label>
                <textarea 
                  value={editFormData.description || ''} 
                  onChange={e => setEditFormData({...editFormData, description: e.target.value})}
                  rows={4}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
                ></textarea>
              </div>

              <div className="book-modal-actions">
                <button type="button" className="btn-cancel" onClick={closeEditModal}>Hủy</button>
                <button type="submit" className="btn-save">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
