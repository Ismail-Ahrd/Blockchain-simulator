package com.blockchain.demo.model;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Block {
    private int index;
    private long timestamp;
    private String data;
    private String previousHash;
    private String hash;
    private int nonce;
    private List<Transaction> transactions = new ArrayList<>();

    public Block(int index, String data, String previousHash) {
        this.index = index;
        this.timestamp = new java.util.Date().getTime();
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0; // Initialize nonce to 0
    }


    public boolean validateTransactions() {
        for (Transaction transaction : transactions) {
            if (!validateTransaction(transaction)) {
                return false;
            }
        }
        return true;
    }

    private boolean validateTransaction(Transaction transaction) {
        // Simplified validation: just checking if the sender has enough balance
        // In a real-world scenario, you'd need to check digital signatures and other security measures
        // Also, handle the case when the sender's balance is insufficient
        return true;
    }
}