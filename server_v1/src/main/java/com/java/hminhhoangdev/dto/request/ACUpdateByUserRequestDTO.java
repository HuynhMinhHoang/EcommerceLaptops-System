package com.java.hminhhoangdev.dto.request;

import com.java.hminhhoangdev.util.Gender;

import java.time.LocalDate;

public class ACUpdateByUserRequestDTO {
    private String fullName;
    private Gender gender;
    private LocalDate dateOfBirth;
    private String address;

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
}
