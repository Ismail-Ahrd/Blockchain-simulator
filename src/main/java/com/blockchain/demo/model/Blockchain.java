package com.blockchain.demo.model;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Blockchain {
    private ArrayList<String> listUsers = new ArrayList<>();
    private ArrayList<Block> blockchain = new ArrayList<>();
    private int difficulty;
    private double intitialBalance;
    private List<Transaction> transactionsPool = new ArrayList<>();
    private int blockSize; // Maximum number of transactions per block

    public Blockchain(int difficulty, int blockSize, double initialBalance) {
        this.difficulty = difficulty;
        this.blockSize = blockSize;
        this.intitialBalance = initialBalance;
    }



    /*public boolean isValid() {
        for (int i = 1; i < blockchain.size(); i++) {
            Block currentBlock = blockchain.get(i);
            Block previousBlock = blockchain.get(i - 1);

            if (!currentBlock.calculateHash().equals(currentBlock.getHash())) {
                System.out.println("Hash of Block " + i + " is incorrect.");
                return false;
            }

            if (!currentBlock.getPreviousHash().equals(previousBlock.getHash())) {
                System.out.println("Previous Hash of Block " + i + " is incorrect.");
                return false;
            }
        }
        return true;
    }*/
}