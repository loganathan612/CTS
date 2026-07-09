package com.cognizant.account.model;

/**
 * Model class representing a bank account.
 * Jackson serializes this to:
 * {"number":"00987987973432","type":"savings","balance":234343}
 */
public class Account {

    private String number;
    private String type;
    private double balance;

    public Account() {
    }

    public Account(String number, String type, double balance) {
        this.number = number;
        this.type = type;
        this.balance = balance;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
