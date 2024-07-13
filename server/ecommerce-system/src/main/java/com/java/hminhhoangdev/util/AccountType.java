package com.java.hminhhoangdev.util;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum AccountType {
    @JsonProperty("ADMIN")
    ADMIN,
    @JsonProperty("USER")
    USER

}
