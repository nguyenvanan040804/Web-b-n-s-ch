package com.bookstore.controller;

import com.bookstore.model.Book;
import com.bookstore.model.Review;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final List<Book> books = new CopyOnWriteArrayList<>(List.of(
        new Book(
            1L, 
            "Đắc Nhân Tâm", 
            "Dale Carnegie", 
            "Cuốn sách đưa ra các lời khuyên về cách thức cư xử, ứng xử và giao tiếp với mọi người để đạt được sự đồng cảm và thành công trong cuộc sống.", 
            86000, 
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
            "Kỹ năng",
            "NXB Tổng hợp TP.HCM",
            320,
            2021
        ),
        new Book(
            2L, 
            "Nhà Giả Kim", 
            "Paulo Coelho", 
            "Một tác phẩm kinh diễn về việc theo đuổi ước mơ, lắng nghe tiếng nói của trái tim và học cách thấu hiểu các điềm báo của vũ trụ.", 
            79000, 
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
            "Tiểu thuyết",
            "NXB Hội Nhà Văn",
            228,
            2020
        ),
        new Book(
            3L, 
            "Nghĩ Giàu Và Làm Giàu", 
            "Napoleon Hill", 
            "Một trong những cuốn sách truyền cảm hứng làm giàu và thành công cá nhân kinh điển nhất, giúp bạn thay đổi tư duy làm chủ cuộc đời.", 
            110000, 
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
            "Kinh tế",
            "NXB Trẻ",
            400,
            2019
        ),
        new Book(
            4L, 
            "Hoàng Tử Bé", 
            "Antoine de Saint-Exupéry", 
            "Câu chuyện triết lý sâu sắc đầy tính nhân văn và thơ mộng về tình bạn, tình yêu và ý nghĩa đích thực của cuộc sống qua mắt một cậu bé.", 
            55000, 
            "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=600&q=80",
            "Thiếu nhi",
            "NXB Kim Đồng",
            102,
            2022
        ),
        new Book(
            5L, 
            "Sapiens: Lược Sử Loài Người", 
            "Yuval Noah Harari", 
            "Cuốn sách đột phá giải mã lịch sử loài người từ những tổ tiên xa xưa thời kỳ đồ đá cho đến sự thống trị toàn cầu ở thế kỷ XXI.", 
            165000, 
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
            "Khoa học",
            "NXB Thế Giới",
            560,
            2021
        ),
        new Book(
            6L, 
            "Tôi Tự Học", 
            "Nguyễn Duy Cần", 
            "Tác phẩm quý giá hướng dẫn bạn đọc cách rèn luyện khả năng tư duy tự chủ, tự học hỏi hiệu quả để đạt tri thức thực sự.", 
            68000, 
            "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
            "Kỹ năng",
            "NXB Trẻ",
            200,
            2018
        ),
        new Book(
            7L, 
            "Cha Giàu Cha Nghèo", 
            "Robert Kiyosaki", 
            "Một trong những cuốn sách hay nhất về quản lý tài chính cá nhân, giúp bạn hiểu rõ sự khác biệt giữa tài sản và tiêu sản.", 
            125000, 
            "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=600&q=80",
            "Kinh tế",
            "NXB Trẻ",
            380,
            2021
        ),
        new Book(
            8L, 
            "Lược Sử Thời Gian", 
            "Stephen Hawking", 
            "Cuốn sách khám phá những bí ẩn lớn nhất của vũ trụ: hố đen, thời gian và sự khởi đầu của vạn vật.", 
            115000, 
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
            "Khoa học",
            "NXB Thế Giới",
            290,
            2020
        ),
        new Book(
            9L, 
            "Số Đỏ", 
            "Vũ Trọng Phụng", 
            "Tác phẩm trào phúng kinh điển phản ánh xã hội Việt Nam thời kỳ Âu hóa nửa thực dân nửa phong kiến.", 
            65000, 
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80",
            "Tiểu thuyết",
            "NXB Hội Nhà Văn",
            250,
            2019
        ),
        new Book(
            10L, 
            "Kính Vạn Hoa", 
            "Nguyễn Nhật Ánh", 
            "Những câu chuyện học đường hài hước, cảm động về tình bạn và những bài học cuộc sống đáng quý.", 
            95000, 
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
            "Thiếu nhi",
            "NXB Kim Đồng",
            340,
            2022
        ),
        new Book(
            11L, 
            "Rừng Na Uy", 
            "Haruki Murakami", 
            "Tác phẩm nổi tiếng khắc họa những trăn trở, cô đơn và tình yêu tuổi trẻ đầy day dứt.", 
            135000, 
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
            "Tiểu thuyết",
            "NXB Hội Nhà Văn",
            450,
            2021
        ),
        new Book(
            12L, 
            "Hạt Giống Tâm Hồn", 
            "Nhiều tác giả", 
            "Những câu chuyện ngắn đầy ý nghĩa truyền cảm hứng vượt qua khó khăn và trân trọng cuộc sống.", 
            45000, 
            "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
            "Kỹ năng",
            "NXB Tổng hợp TP.HCM",
            180,
            2022
        )
    ));

    public BookController() {
        // Pre-populate some book items with starting reviews and averageRating calculations
        for (Book b : books) {
            if (b.getId() == 1L) {
                b.addReview(new Review("user1@gmail.com", "Nguyễn Văn An", 5, "Sách hay quá! Nên đọc trong đời.", System.currentTimeMillis() - 86400000L));
                b.addReview(new Review("user2@gmail.com", "Trần Thị Bình", 4, "Sách viết dễ hiểu, có nhiều ví dụ thực tế giúp ích nhiều cho công việc.", System.currentTimeMillis() - 172800000L));
            } else if (b.getId() == 2L) {
                b.addReview(new Review("user3@gmail.com", "Lê Văn Cường", 5, "Nhà Giả Kim là tác phẩm tuyệt vời, mỗi lần đọc lại chiêm nghiệm thêm điều mới.", System.currentTimeMillis() - 43200000L));
            } else if (b.getId() == 3L) {
                b.addReview(new Review("user4@gmail.com", "Phạm Văn Dũng", 4, "Sách truyền cảm hứng tốt, thúc đẩy tư duy kinh tế của bản thân.", System.currentTimeMillis() - 345600000L));
            }
        }
    }

    @GetMapping
    public List<Book> getBooks() {
        return books;
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        if (book.getId() == null || book.getId() == 0) {
            book.setId(System.currentTimeMillis());
        }
        if (book.getCoverUrl() == null || book.getCoverUrl().trim().isEmpty()) {
            book.setCoverUrl("https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80");
        }
        books.add(0, book); // insert at the top so it displays first
        return ResponseEntity.ok(book);
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<Book> addReview(@PathVariable("id") Long id, @RequestBody Review review) {
        for (Book b : books) {
            if (b.getId().equals(id)) {
                if (review.getTimestamp() == 0) {
                    review.setTimestamp(System.currentTimeMillis());
                }
                b.addReview(review);
                return ResponseEntity.ok(b);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
