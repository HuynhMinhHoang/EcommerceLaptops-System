package com.java.hminhhoangdev.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.java.hminhhoangdev.util.*;
import jakarta.validation.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

import static com.java.hminhhoangdev.util.Gender.*;

public class AccountRequestDTO implements Serializable {
    private Long id;
    @NotBlank(message = "Username must be not blank")
    private String username;

    @Size(min = 3, max = 20, message = "Password length must be between 6 and 20 characters")
    private String password;

    @NotNull(message = "role must be not null")
    @EnumValue(name = "role", enumClass = AccountType.class)
    private String role;

    @NotNull(message = "FullName must be not null")
    private String fullName;

    @GenderSubset(anyOf = {MALE, FEMALE, OTHER})
    private Gender gender;

    @NotNull(message = "dateOfBirth must be not null")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "MM/dd/yyyy")
    private Date dateOfBirth;

    @Email(message = "Email should be valid")
    private String email;

    @PhoneNumber
    private String phone;

    @NotBlank(message = "Address must be provided")
    private String address;

    @EnumPattern(name = "status", regexp = "ACTIVE|INACTIVE|NONE")
    private AccountStatus status;


    public AccountRequestDTO(String username, String password, String role, String fullName, String email, String phone, String address) {
//        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.fullName = fullName;
//        this.gender = gender;
//        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phone = phone;
        this.address = address;
//        this.status = status;
    }


    public @NotNull(message = "dateOfBirth must be not null") Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(@NotNull(message = "dateOfBirth must be not null") Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "AccountRequestDTO{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", fullName='" + fullName + '\'' +
                ", gender=" + gender +
                ", dateOfBirth=" + dateOfBirth +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", status=" + status +
                '}';
    }
}
