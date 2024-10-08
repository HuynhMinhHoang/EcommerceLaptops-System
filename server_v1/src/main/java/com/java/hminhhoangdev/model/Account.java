package com.java.hminhhoangdev.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.java.hminhhoangdev.util.AccountStatus;
import com.java.hminhhoangdev.util.Gender;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAccount;
    private String socialAccountId;
    private String fullName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String address;
    private String email;
    private String phone;
    private String username;
    private String password;
    private String avt;
    @Enumerated(EnumType.STRING)
    private AccountStatus status;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Order> orders;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAvt() {
        return avt;
    }

    public void setAvt(String avt) {
        this.avt = avt;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public int getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(int idAccount) {
        this.idAccount = idAccount;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSocialAccountId() {
        return socialAccountId;
    }

    public void setSocialAccountId(String socialAccountId) {
        this.socialAccountId = socialAccountId;
    }

    @Transient
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }


    @Override
    public String toString() {
        return "Account{" + "address='" + address + '\'' + ", idAccount=" + idAccount + ", fullName='" + fullName + '\'' + ", dateOfBirth=" + dateOfBirth + ", gender=" + gender + ", email='" + email + '\'' + ", phone='" + phone + '\'' + ", username='" + username + '\'' + ", password='" + password + '\'' + ", avt='" + avt + '\'' + ", status=" + status + ", role=" + role + ", createdAt=" + createdAt + '}';
    }
}
