package com.bookstore.repository;

import com.bookstore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

<<<<<<< HEAD
    Optional<User> findByEmail(String email);

}
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
 main
=======
    User findByEmail(String email);
}
>>>>>>> 665dcd1 (Cap nhat quen mat khau)
