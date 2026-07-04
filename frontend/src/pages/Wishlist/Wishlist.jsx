import { useEffect, useState } from "react";
import {
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../../api/wishlistApi";

import "./Wishlist.css";

export default function Wishlist({ app }) {
  const { addToCart } = app;

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await removeFromWishlist(bookId);

      setWishlist((prev) =>
        prev.filter((book) => book.id !== bookId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa toàn bộ danh sách yêu thích?"))
      return;

    try {
      await clearWishlist();
      setWishlist([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wishlist-container">
      <h1>❤️ Danh sách yêu thích</h1>

      {wishlist.length > 0 && (
        <button
          className="clear-btn"
          onClick={handleClear}
        >
          Xóa tất cả
        </button>
      )}

      {wishlist.length === 0 ? (
        <p className="empty">
          Chưa có sách nào trong danh sách yêu thích.
        </p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((book) => (
            <div
              key={book.id}
              className="wishlist-card"
            >
              <img
                src={book.coverUrl}
                alt={book.title}
              />

              <h3>{book.title}</h3>

              <p>{book.author}</p>

              <p className="price">
                {book.price.toLocaleString("vi-VN")} đ
              </p>

              <div className="wishlist-actions">
               <button
    className="add-btn"
    onClick={() => addToCart(book)}
>
    + Thêm
</button>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(book.id)}
                >
                  💔 Bỏ yêu thích
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}