// ResponseLoginDTO.java
package com.java.hminhhoangdev.dto.response;

import com.java.hminhhoangdev.model.Account;
import com.java.hminhhoangdev.util.AccountStatus;
import com.java.hminhhoangdev.util.Gender;

import java.time.LocalDate;

public class ResponseLoginDTO {
    private String accessToken;
    private String refreshToken;
    private int idAccount;
    private String fullName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String address;
    private String email;
    private String phone;
    private String username;
    private String avt;
    private AccountStatus status;
    private String role;

    public ResponseLoginDTO(String accessToken, String refreshToken, Account account) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.idAccount = account.getIdAccount();
        this.fullName = account.getFullName();
        this.dateOfBirth = account.getDateOfBirth();
        this.gender = account.getGender();
        this.address = account.getAddress();
        this.email = account.getEmail();
        this.phone = account.getPhone();
        this.username = account.getUsername();
        this.avt = account.getAvt();
        this.status = account.getStatus();
        this.role = account.getRole().getNameRole();
    }

    // Getter và Setter cho accessToken, refreshToken và các trường khác
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public int getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(int idAccount) {
        this.idAccount = idAccount;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvt() {
        return avt;
    }

    public void setAvt(String avt) {
        this.avt = avt;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
