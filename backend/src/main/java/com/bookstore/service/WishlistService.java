package com.bookstore.service;

import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private BookRepository bookRepository;

    // Danh sách yêu thích tạm thời (lưu trong RAM)
    private final List<Book> wishlist = new ArrayList<>();

    // Lấy toàn bộ danh sách yêu thích
    public List<Book> getWishlist() {
        return wishlist;
    }

    // Thêm sách vào danh sách yêu thích
    public Book addToWishlist(Long bookId) {

        Book book = bookRepository.findById(bookId).orElse(null);

        if (book == null) {
            return null;
        }

        boolean exists = wishlist.stream()
                .anyMatch(item -> item.getId().equals(bookId));

        if (!exists) {
            wishlist.add(book);
        }

        return book;
    }

    // Xóa khỏi danh sách yêu thích
    public boolean removeFromWishlist(Long bookId) {

        return wishlist.removeIf(book ->
                book.getId().equals(bookId));

    }

    // Kiểm tra đã yêu thích chưa
    public boolean isFavorite(Long bookId) {

        return wishlist.stream()
                .anyMatch(book ->
                        book.getId().equals(bookId));

    }

    // Đếm số lượng sách yêu thích
    public int getWishlistCount() {

        return wishlist.size();

    }

    // Xóa toàn bộ danh sách yêu thích
    public void clearWishlist() {

        wishlist.clear();

    }
}