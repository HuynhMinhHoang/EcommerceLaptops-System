package com.java.hminhhoangdev.dto.request;

public class OrderRequestDTO {

    private String shippingAddress;
    private double total_amount;
    private String note;
    private int accountId;
    private int paymentTypeId;

    public OrderRequestDTO() {
    }

    public OrderRequestDTO(String shippingAddress, double total_amount, String note, int accountId, int paymentTypeId) {
        this.shippingAddress = shippingAddress;
        this.total_amount = total_amount;
        this.note = note;
        this.accountId = accountId;
        this.paymentTypeId = paymentTypeId;
    }

    public double getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(double total_amount) {
        this.total_amount = total_amount;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public int getPaymentTypeId() {
        return paymentTypeId;
    }

    public void setPaymentTypeId(int paymentTypeId) {
        this.paymentTypeId = paymentTypeId;
    }

    @Override
    public String toString() {
        return "OrderRequestDTO{" + "shippingAddress='" + shippingAddress + '\'' + "total_amount='" + total_amount + '\'' + ", note='" + note + '\'' + ", accountId=" + accountId + ", paymentTypeId=" + paymentTypeId + '}';
    }
}
