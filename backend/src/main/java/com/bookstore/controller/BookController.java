package com.bookstore.controller;
// fixed BOM

import com.bookstore.model.Book;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final List<Book> books = List.of(
        new Book(1L, "Chuyện Kể Dưới Ánh Trăng", "Nguyễn Nhật Ánh", "Tiểu thuyết Việt Nam ấm áp dành cho mọi lứa tuổi.", 129000, "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80"),
        new Book(2L, "Dịch Chuyển Nhanh", "Malcolm Gladwell", "Sách về thói quen, tư duy và hiệu suất cá nhân.", 179000, "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=80"),
        new Book(3L, "Lãnh Đạo Tinh Gọn", "Eric Ries", "Hướng dẫn xây dựng sản phẩm và doanh nghiệp theo phương pháp Lean Startup.", 155000, "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=80"),
        new Book(4L, "Sức Mạnh của Thói Quen", "James Clear", "Chiến lược thay đổi thói quen nhỏ để đạt kết quả lớn.", 139000, "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80"),
        new Book(5L, "Từ Tốt Đến Vĩ Đại", "Jim Collins", "Giải mã những yếu tố làm nên công ty dẫn đầu thị trường.", 169000, "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=80")
    );

    @GetMapping
    public List<Book> getBooks() {
        return books;
    }
}
