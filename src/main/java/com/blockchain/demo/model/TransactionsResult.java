package com.blockchain.demo.model;

import java.util.List;

public class TransactionsResult {
    private final List<Transaction> results;
    private final long count;

    public TransactionsResult(List<Transaction> results, long count) {
        this.results = results;
        this.count = count;
    }

    public List<Transaction> getResults() {
        return results;
    }

    public long getCount() {
        return count;
    }
}
