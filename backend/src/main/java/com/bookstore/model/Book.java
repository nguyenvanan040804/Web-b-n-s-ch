package com.bookstore.model;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class Book {

    private Long id;
    private String title;
    private String author;
    private String description;
    private double price;
    private String coverUrl;
    private String category;
    private String publisher;
    private int pages;
    private int year;
    private List<Review> reviews;
    private double averageRating;
    private int salesCount;

    public Book() {
        this.reviews = new CopyOnWriteArrayList<>();
        this.averageRating = 0.0;
        this.salesCount = 0;
    }

    public Book(Long id, String title, String author, String description, double price, String coverUrl, String category, String publisher, int pages, int year) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.price = price;
        this.coverUrl = coverUrl;
        this.category = category;
        this.publisher = publisher;
        this.pages = pages;
        this.year = year;
        this.reviews = new CopyOnWriteArrayList<>();
        this.averageRating = 0.0;
        // Seed some varying salesCount based on ID for sorting demonstration
        this.salesCount = (int) (id * 17) % 150 + 10;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
        recalculateAverageRating();
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public int getSalesCount() {
        return salesCount;
    }

    public void setSalesCount(int salesCount) {
        this.salesCount = salesCount;
    }

    public void addReview(Review review) {
        if (this.reviews == null) {
            this.reviews = new CopyOnWriteArrayList<>();
        }
        this.reviews.add(0, review);
        recalculateAverageRating();
    }

    private void recalculateAverageRating() {
        if (this.reviews == null || this.reviews.isEmpty()) {
            this.averageRating = 0.0;
            return;
        }
        double sum = 0.0;
        for (Review r : this.reviews) {
            sum += r.getRating();
        }
        // Round to 1 decimal place
        this.averageRating = Math.round((sum / this.reviews.size()) * 10.0) / 10.0;
    }
}
