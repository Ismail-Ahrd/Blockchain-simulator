package com.blockchain.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
public class Transaction {
    private String sender;
    private String receiver;
    private double amount;
    private String signature;
}