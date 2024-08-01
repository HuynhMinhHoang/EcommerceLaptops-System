package com.java.hminhhoangdev.util;// src/main/java/com/java/hminhhoangdev/constants/CategoryType.java


public enum CategoryType {
    LAPTOPGAMING(1, "LAPTOPGAMING"), LAPTOP(2, "LAPTOP"), PC(3, "PC"), HEADPHONE(4, "HEADPHONE"), MOUSE(5, "MOUSE"), SCREEN(6, "SCREEN"), KEYBOARD(7, "KEYBOARD");

    private final int id;
    private final String name;

    CategoryType(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public static CategoryType fromName(String name) {
        for (CategoryType category : values()) {
            if (category.getName().equalsIgnoreCase(name)) {
                return category;
            }
        }
        throw new IllegalArgumentException("Invalid category name: " + name);
    }
}
