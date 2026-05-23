package com.bookstore.model;

public class Review {
    private String userEmail;
    private String userName;
    private int rating;
    private String comment;
    private long timestamp;

    public Review() {
    }

    public Review(String userEmail, String userName, int rating, String comment, long timestamp) {
        this.userEmail = userEmail;
        this.userName = userName;
        this.rating = rating;
        this.comment = comment;
        this.timestamp = timestamp;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
