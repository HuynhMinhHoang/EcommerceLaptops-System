package com.java.hminhhoangdev.dto.response;

import com.java.hminhhoangdev.model.Role;
import com.java.hminhhoangdev.util.AccountStatus;
import com.java.hminhhoangdev.util.Gender;

import java.time.LocalDate;

public class ResponseUser {
    private int id;
    private String name;
    private String profilePictureUrl;
    private String token;
    private String refreshToken;
    private String email;
    private String address;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String phone;
    private Role role;
    private AccountStatus status;
    private String socialAccountId;
    private String username;

    public ResponseUser(int id, String name, String profilePictureUrl, String token, String refreshToken, String email, String address, LocalDate dateOfBirth, Gender gender, String phone, Role role, AccountStatus status, String socialAccountId, String username) {
        this.id = id;
        this.name = name;
        this.profilePictureUrl = profilePictureUrl;
        this.token = token;
        this.refreshToken = refreshToken;
        this.email = email;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phone = phone;
        this.role = role;
        this.status = status;
        this.socialAccountId = socialAccountId;
        this.username = username;
    }

    // Getters and Setters


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSocialAccountId() {
        return socialAccountId;
    }

    public void setSocialAccountId(String socialAccountId) {
        this.socialAccountId = socialAccountId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }
}
