import React from 'react';
import { Ic, ICONS } from '../AdminIcons';
import './AddBook.css';

/**
 * AddBook — Tab Thêm Sách mới
 * Props: newBook, setNewBook, handleCreateBook, adminMessage
 */
export default function AddBook({ newBook, setNewBook, handleCreateBook, adminMessage }) {
  return (
    <div>
      {/* Section header */}
      <div className="adm-section-header">
        <div>
          <h3>Thêm Sách Mới lên Cửa hàng</h3>
          <p>Điền đầy đủ thông tin bên dưới. Sách mới sẽ xuất hiện ngay trên trang Cửa hàng.</p>
        </div>
      </div>

      {/* Form card */}
      <div className="adm-card">
        <form className="adm-form-grid" onSubmit={handleCreateBook}>

          <div className="form-group">
            <label htmlFor="new-title">Tiêu đề sách *</label>
            <input
              id="new-title" type="text" required
              placeholder="Ví dụ: Đọc vị bất kỳ ai"
              value={newBook.title}
              onChange={e => setNewBook({ ...newBook, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-author">Tác giả *</label>
            <input
              id="new-author" type="text" required
              placeholder="Ví dụ: David J. Lieberman"
              value={newBook.author}
              onChange={e => setNewBook({ ...newBook, author: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-cat">Thể loại sách</label>
            <select
              id="new-cat"
              value={newBook.category}
              onChange={e => setNewBook({ ...newBook, category: e.target.value })}
            >
              <option value="Tiểu thuyết">Tiểu thuyết</option>
              <option value="Kỹ năng">Kỹ năng</option>
              <option value="Kinh tế">Kinh tế</option>
              <option value="Thiếu nhi">Thiếu nhi</option>
              <option value="Khoa học">Khoa học</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="new-price">Giá tiền (VND) *</label>
            <input
              id="new-price" type="number" required
              placeholder="Ví dụ: 89000"
              value={newBook.price}
              onChange={e => setNewBook({ ...newBook, price: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-cover">Ảnh bìa (Tải lên từ máy tính)</label>
            <input
              id="new-cover" type="file" accept="image/*"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setNewBook({ ...newBook, coverFile: e.target.files[0] });
                }
              }}
            />
            {newBook.coverFile && <p style={{fontSize: '13px', color: '#666', marginTop: '4px'}}>Đã chọn: {newBook.coverFile.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="new-pub">Nhà xuất bản</label>
            <input
              id="new-pub" type="text"
              placeholder="Ví dụ: NXB Trẻ"
              value={newBook.publisher}
              onChange={e => setNewBook({ ...newBook, publisher: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-pages">Số trang</label>
            <input
              id="new-pages" type="number"
              placeholder="Ví dụ: 250"
              value={newBook.pages}
              onChange={e => setNewBook({ ...newBook, pages: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-year">Năm xuất bản</label>
            <input
              id="new-year" type="number"
              placeholder="Ví dụ: 2023"
              value={newBook.year}
              onChange={e => setNewBook({ ...newBook, year: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-weight">Khối lượng (gram)</label>
            <input
              id="new-weight" type="number"
              placeholder="Ví dụ: 350"
              value={newBook.weight}
              onChange={e => setNewBook({ ...newBook, weight: e.target.value })}
            />
          </div>

          <div className="form-group adm-span2">
            <label htmlFor="new-desc">Mô tả tóm tắt sách</label>
            <textarea
              id="new-desc" rows="4"
              placeholder="Nhập mô tả tóm tắt nội dung chính để khách hàng nắm bắt được trước khi đặt..."
              value={newBook.description}
              onChange={e => setNewBook({ ...newBook, description: e.target.value })}
            />
          </div>

          <button type="submit" className="submit-btn adm-span2">
            <Ic path={ICONS.plus} size={18} /> Lưu và Đăng lên cửa hàng
          </button>
        </form>

        {adminMessage && (
          <div className="adm-msg-box">{adminMessage}</div>
        )}
      </div>
    </div>
  );
}
