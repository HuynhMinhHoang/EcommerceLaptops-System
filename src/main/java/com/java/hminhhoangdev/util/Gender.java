package com.java.hminhhoangdev.util;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Gender {
    @JsonProperty("MALE")
    MALE,
    @JsonProperty("FEMALE")
    FEMALE,
    @JsonProperty("OTHER")
    OTHER;
}
