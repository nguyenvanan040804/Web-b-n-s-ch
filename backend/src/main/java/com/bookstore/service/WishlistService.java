package com.bookstore.service;

import com.bookstore.model.Book;
import com.bookstore.model.User;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Lấy toàn bộ danh sách yêu thích của người dùng hiện tại
    public List<Book> getWishlist() {
        User user = getCurrentUser();
        return new ArrayList<>(user.getWishlist());
    }

    // Thêm sách vào danh sách yêu thích
    @Transactional
    public Book addToWishlist(Long bookId) {
        User user = getCurrentUser();
        Book book = bookRepository.findById(bookId).orElse(null);

        if (book == null) {
            return null;
        }

        user.getWishlist().add(book);
        userRepository.save(user);

        return book;
    }

    // Xóa khỏi danh sách yêu thích
    @Transactional
    public boolean removeFromWishlist(Long bookId) {
        User user = getCurrentUser();
        boolean removed = user.getWishlist().removeIf(book -> book.getId().equals(bookId));
        
        if (removed) {
            userRepository.save(user);
        }
        return removed;
    }

    // Kiểm tra đã yêu thích chưa
    public boolean isFavorite(Long bookId) {
        User user = getCurrentUser();
        return user.getWishlist().stream().anyMatch(book -> book.getId().equals(bookId));
    }

    // Đếm số lượng sách yêu thích
    public int getWishlistCount() {
        User user = getCurrentUser();
        return user.getWishlist().size();
    }

    // Xóa toàn bộ danh sách yêu thích
    @Transactional
    public void clearWishlist() {
        User user = getCurrentUser();
        user.getWishlist().clear();
        userRepository.save(user);
    }
}