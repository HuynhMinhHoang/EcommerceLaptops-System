package com.java.hminhhoangdev.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.java.hminhhoangdev.util.*;
import jakarta.validation.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class AccountRequestDTO implements Serializable {
    private int idAccount;

    @NotBlank(message = "Username must not be blank")
    private String username;

    @Size(min = 6, max = 20, message = "Password length must be between 6 and 20 characters")
    private String password;

    @NotBlank(message = "Full name must not be blank")
    private String fullName;

    @GenderSubset(anyOf = {Gender.MALE, Gender.FEMALE, Gender.OTHER})
    private Gender gender;


    @NotNull(message = "Date of birth must not be null")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @Email(message = "Email should be valid")
    private String email;

    @PhoneNumber
    private String phone;

    @NotBlank(message = "Address must not be blank")
    private String address;

    @EnumPattern(name = "status", regexp = "ACTIVE|INACTIVE|NONE")
    private AccountStatus status;

    @NotNull(message = "Role ID must not be null")
    private int roleId;

    private String roleName;

    private MultipartFile avt;

    public AccountRequestDTO() {
    }

    public AccountRequestDTO(String address, MultipartFile avt, LocalDate dateOfBirth, String email, String fullName, Gender gender, int idAccount, String password, String phone, int roleId, String roleName, AccountStatus status, String username) {
        this.address = address;
        this.avt = avt;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.fullName = fullName;
        this.gender = gender;
        this.idAccount = idAccount;
        this.password = password;
        this.phone = phone;
        this.roleId = roleId;
        this.roleName = roleName;
        this.status = status;
        this.username = username;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public @NotBlank(message = "Address must not be blank") String getAddress() {
        return address;
    }

    public void setAddress(@NotBlank(message = "Address must not be blank") String address) {
        this.address = address;
    }

    public MultipartFile getAvt() {
        return avt;
    }

    public void setAvt(MultipartFile avt) {
        this.avt = avt;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(@NotNull(message = "Date of birth must not be null") LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public @Email(message = "Email should be valid") String getEmail() {
        return email;
    }

    public void setEmail(@Email(message = "Email should be valid") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Full name must not be blank") String getFullName() {
        return fullName;
    }

    public void setFullName(@NotBlank(message = "Full name must not be blank") String fullName) {
        this.fullName = fullName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public int getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(int idAccount) {
        this.idAccount = idAccount;
    }

    public @Size(min = 6, max = 20, message = "Password length must be between 6 and 20 characters") String getPassword() {
        return password;
    }

    public void setPassword(@Size(min = 6, max = 20, message = "Password length must be between 6 and 20 characters") String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @NotNull(message = "Role ID must not be null")
    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(@NotNull(message = "Role ID must not be null") int roleId) {
        this.roleId = roleId;
    }

    public @EnumPattern(name = "status", regexp = "ACTIVE|INACTIVE|NONE") AccountStatus getStatus() {
        return status;
    }

    public void setStatus(@EnumPattern(name = "status", regexp = "ACTIVE|INACTIVE|NONE") AccountStatus status) {
        this.status = status;
    }

    public @NotBlank(message = "Username must not be blank") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank(message = "Username must not be blank") String username) {
        this.username = username;
    }
}
