import React, { useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './BookPreview.css';

const Page = forwardRef((props, ref) => {
  return (
    <div className="preview-page" ref={ref}>
      <div className="preview-page-inner">
        {props.children}
        <div className="page-number">{props.number}</div>
      </div>
    </div>
  );
});

const BookPreview = ({ book, onClose, onAddToCart }) => {
  const bookRef = useRef();

  const handleAddToCart = () => {
    onAddToCart(book);
    onClose();
  };

  return (
    <div className="book-preview-overlay" onClick={onClose}>
      <div className="book-preview-container" onClick={(e) => e.stopPropagation()}>
        <HTMLFlipBook 
          width={280} 
          height={420} 
          size="stretch"
          minWidth={245}
          maxWidth={395}
          minHeight={335}
          maxHeight={530}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="preview-flipbook"
          ref={bookRef}
        >
          <Page number="1">
            <div className="preview-page-cover">
              <img src={book.imageUrl || 'https://via.placeholder.com/300x400?text=Cover'} alt={book.title} />
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </div>
          </Page>

          <Page number="2">
            <div className="preview-page-content">
              <h3>Chương 1: Lời mở đầu</h3>
              <p>
                Đây là phần nội dung đọc thử của cuốn sách <strong>{book.title}</strong>. 
                Cuốn sách này mở ra một hành trình thú vị và đầy cảm hứng.
              </p>
              <p>
                Những trang đầu tiên thường là nơi tác giả gửi gắm những thông điệp cốt lõi nhất. 
                Bạn đang trải nghiệm tính năng lật trang mượt mà.
              </p>
            </div>
          </Page>

          <Page number="3">
            <div className="preview-page-content">
              <p>
                Qua những chương tiếp theo, người đọc sẽ đi sâu vào những chi tiết hấp dẫn, 
                những bài học giá trị và những kiến thức bổ ích mà tác giả đã dày công biên soạn.
              </p>
              <p>
                (Nội dung trang 3 - Đọc thử)
              </p>
            </div>
          </Page>

          <Page number="4">
            <div className="preview-page-content">
              <p>
                Càng đọc, bạn sẽ càng cảm nhận được sự lôi cuốn của từng câu chữ. 
                Đừng bỏ lỡ cơ hội sở hữu cuốn sách tuyệt vời này trong bộ sưu tập của bạn.
              </p>
              <p>
                (Nội dung trang 4 - Đọc thử)
              </p>
            </div>
          </Page>

          <Page number="5">
            <div className="preview-page-content last-page">
              <h3>Hết phần đọc thử</h3>
              <p className="cta-text">Nếu thấy hay, hãy mua ngay tại đây!</p>
              <button className="cta-add-to-cart" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
            </div>
          </Page>

          <Page number="6">
            <div className="preview-page-cover">
              <h3>Bìa sau</h3>
              <p>Cảm ơn bạn đã đọc thử!</p>
            </div>
          </Page>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default BookPreview;
