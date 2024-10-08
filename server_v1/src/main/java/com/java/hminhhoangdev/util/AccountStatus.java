package com.java.hminhhoangdev.util;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum AccountStatus {
    @JsonProperty("ACTIVE") ACTIVE(1), @JsonProperty("INACTIVE") INACTIVE(0), @JsonProperty("NONE") NONE(-1);

    private final int value;

    AccountStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

