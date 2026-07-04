package com.bookstore.controller;

import com.bookstore.model.Book;
import com.bookstore.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    // Lấy toàn bộ danh sách yêu thích
    @GetMapping
    public ResponseEntity<List<Book>> getWishlist() {

        return ResponseEntity.ok(wishlistService.getWishlist());

    }

    // Thêm sách vào danh sách yêu thích
    @PostMapping("/{bookId}")
    public ResponseEntity<?> addToWishlist(@PathVariable Long bookId) {

        Book book = wishlistService.addToWishlist(bookId);

        if (book == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Không tìm thấy sách với ID = " + bookId);
        }

        return ResponseEntity.ok(book);

    }

    // Xóa sách khỏi danh sách yêu thích
    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long bookId) {

        boolean removed = wishlistService.removeFromWishlist(bookId);

        if (!removed) {
            return ResponseEntity
                    .badRequest()
                    .body("Sách không có trong danh sách yêu thích");
        }

        return ResponseEntity.ok("Đã xóa khỏi danh sách yêu thích");

    }

    // Kiểm tra sách đã được yêu thích chưa
    @GetMapping("/check/{bookId}")
    public ResponseEntity<Boolean> isFavorite(@PathVariable Long bookId) {

        return ResponseEntity.ok(
                wishlistService.isFavorite(bookId)
        );

    }

    // Đếm số lượng sách yêu thích
    @GetMapping("/count")
    public ResponseEntity<Integer> getCount() {

        return ResponseEntity.ok(
                wishlistService.getWishlistCount()
        );

    }

    // Xóa toàn bộ danh sách yêu thích
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearWishlist() {

        wishlistService.clearWishlist();

        return ResponseEntity.ok(
                "Đã xóa toàn bộ danh sách yêu thích"
        );

    }

}