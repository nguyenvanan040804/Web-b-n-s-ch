package com.bookstore.config;

import com.bookstore.model.Book;
import com.bookstore.model.Review;
import com.bookstore.model.User;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(BookRepository bookRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User demoUser = new User("Demo Reader", "demo@bookstore.com", passwordEncoder.encode("demo123"), "user", "0987654321", "123 Đường Láng, Đống Đa, Hà Nội");
            User adminUser = new User("Site Admin", "admin@bookstore.com", passwordEncoder.encode("admin123"), "admin", "0900000000", "Văn phòng Nhà Sách, Quận 1, TP.HCM");
            userRepository.saveAll(List.of(demoUser, adminUser));
            System.out.println("Database seeded with default users.");
        } else {
            // Update old plaintext passwords to BCrypt and set as verified
            List<User> existingUsers = userRepository.findAll();
            boolean updated = false;
            for (User user : existingUsers) {
                // If password does not start with $2a$ (BCrypt prefix), it needs to be hashed
                if (user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                    user.setVerified(true);
                    updated = true;
                }
            }
            if (updated) {
                userRepository.saveAll(existingUsers);
                System.out.println("Updated old plaintext passwords to BCrypt format.");
            }
        }

        if (userRepository.findByEmail("superadmin@bookstore.com").isEmpty()) {
            User superAdmin = new User("Super Admin", "superadmin@bookstore.com", passwordEncoder.encode("123456"), "superadmin", "0999999999", "Trụ sở chính");
            superAdmin.setVerified(true);
            userRepository.save(superAdmin);
            System.out.println("Super Admin account created.");
        }

        if (bookRepository.count() == 0) {
            Book book1 = new Book(1L, "Đắc Nhân Tâm", "Dale Carnegie", "Cuốn sách đưa ra các lời khuyên về cách thức cư xử, ứng xử và giao tiếp với mọi người để đạt được sự đồng cảm và thành công trong cuộc sống.", 86000, "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80", "Kỹ năng", "NXB Tổng hợp TP.HCM", 320, 2021);
            Book book2 = new Book(2L, "Nhà Giả Kim", "Paulo Coelho", "Một tác phẩm kinh diễn về việc theo đuổi ước mơ, lắng nghe tiếng nói của trái tim và học cách thấu hiểu các điềm báo của vũ trụ.", 79000, "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80", "Tiểu thuyết", "NXB Hội Nhà Văn", 228, 2020);
            Book book3 = new Book(3L, "Nghĩ Giàu Và Làm Giàu", "Napoleon Hill", "Một trong những cuốn sách truyền cảm hứng làm giàu và thành công cá nhân kinh điển nhất, giúp bạn thay đổi tư duy làm chủ cuộc đời.", 110000, "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80", "Kinh tế", "NXB Trẻ", 400, 2019);
            Book book4 = new Book(4L, "Hoàng Tử Bé", "Antoine de Saint-Exupéry", "Câu chuyện triết lý sâu sắc đầy tính nhân văn và thơ mộng về tình bạn, tình yêu và ý nghĩa đích thực của cuộc sống qua mắt một cậu bé.", 55000, "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=600&q=80", "Thiếu nhi", "NXB Kim Đồng", 102, 2022);
            Book book5 = new Book(5L, "Sapiens: Lược Sử Loài Người", "Yuval Noah Harari", "Cuốn sách đột phá giải mã lịch sử loài người từ những tổ tiên xa xưa thời kỳ đồ đá cho đến sự thống trị toàn cầu ở thế kỷ XXI.", 165000, "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80", "Khoa học", "NXB Thế Giới", 560, 2021);
            Book book6 = new Book(6L, "Tôi Tự Học", "Nguyễn Duy Cần", "Tác phẩm quý giá hướng dẫn bạn đọc cách rèn luyện khả năng tư duy tự chủ, tự học hỏi hiệu quả để đạt tri thức thực sự.", 68000, "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80", "Kỹ năng", "NXB Trẻ", 200, 2018);
            Book book7 = new Book(7L, "Cha Giàu Cha Nghèo", "Robert Kiyosaki", "Một trong những cuốn sách hay nhất về quản lý tài chính cá nhân, giúp bạn hiểu rõ sự khác biệt giữa tài sản và tiêu sản.", 125000, "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=600&q=80", "Kinh tế", "NXB Trẻ", 380, 2021);
            Book book8 = new Book(8L, "Lược Sử Thời Gian", "Stephen Hawking", "Cuốn sách khám phá những bí ẩn lớn nhất của vũ trụ: hố đen, thời gian và sự khởi đầu của vạn vật.", 115000, "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80", "Khoa học", "NXB Thế Giới", 290, 2020);
            Book book9 = new Book(9L, "Số Đỏ", "Vũ Trọng Phụng", "Tác phẩm trào phúng kinh điển phản ánh xã hội Việt Nam thời kỳ Âu hóa nửa thực dân nửa phong kiến.", 65000, "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80", "Tiểu thuyết", "NXB Hội Nhà Văn", 250, 2019);
            Book book10 = new Book(10L, "Kính Vạn Hoa", "Nguyễn Nhật Ánh", "Những câu chuyện học đường hài hước, cảm động về tình bạn và những bài học cuộc sống đáng quý.", 95000, "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80", "Thiếu nhi", "NXB Kim Đồng", 340, 2022);
            Book book11 = new Book(11L, "Rừng Na Uy", "Haruki Murakami", "Tác phẩm nổi tiếng khắc họa những trăn trở, cô đơn và tình yêu tuổi trẻ đầy day dứt.", 135000, "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80", "Tiểu thuyết", "NXB Hội Nhà Văn", 450, 2021);
            Book book12 = new Book(12L, "Hạt Giống Tâm Hồn", "Nhiều tác giả", "Những câu chuyện ngắn đầy ý nghĩa truyền cảm hứng vượt qua khó khăn và trân trọng cuộc sống.", 45000, "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80", "Kỹ năng", "NXB Tổng hợp TP.HCM", 180, 2022);

            Review r1 = new Review("user1@gmail.com", "Nguyễn Văn An", 5, "Sách hay quá! Nên đọc trong đời.", System.currentTimeMillis() - 86400000L);
            r1.setBook(book1);
            Review r2 = new Review("user2@gmail.com", "Trần Thị Bình", 4, "Sách viết dễ hiểu, có nhiều ví dụ thực tế giúp ích nhiều cho công việc.", System.currentTimeMillis() - 172800000L);
            r2.setBook(book1);
            book1.addReview(r1);
            book1.addReview(r2);

            Review r3 = new Review("user3@gmail.com", "Lê Văn Cường", 5, "Nhà Giả Kim là tác phẩm tuyệt vời, mỗi lần đọc lại chiêm nghiệm thêm điều mới.", System.currentTimeMillis() - 43200000L);
            r3.setBook(book2);
            book2.addReview(r3);

            Review r4 = new Review("user4@gmail.com", "Phạm Văn Dũng", 4, "Sách truyền cảm hứng tốt, thúc đẩy tư duy kinh tế của bản thân.", System.currentTimeMillis() - 345600000L);
            r4.setBook(book3);
            book3.addReview(r4);

            bookRepository.saveAll(List.of(book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12));
            System.out.println("Database seeded with books and reviews.");
        }
    }
}
