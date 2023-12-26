package com.blockchain.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blockchain.demo.model.Blockchain;
import com.blockchain.demo.model.Transaction;

@Service
public class TransactionService {
    public void addTransactionToPool(Transaction transaction, Blockchain blockchain) {
        blockchain.getTransactionsPool().add(transaction);
    }

    public List<Transaction> getTransactions(Blockchain blockchain) {
        List<Transaction> transactions = new ArrayList<Transaction>();
        blockchain.getBlockchain().stream().forEach((block) -> transactions.addAll(block.getTransactions()));
        return transactions;
    }

    public void clearTransactionsPool(Blockchain blockchain) {
        blockchain.getTransactionsPool().clear();
    }
}
