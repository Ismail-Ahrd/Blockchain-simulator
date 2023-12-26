package com.blockchain.demo.service;

import java.security.SignatureException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.blockchain.demo.model.Block;
import com.blockchain.demo.model.Blockchain;
import com.blockchain.demo.model.Transaction;
import com.blockchain.demo.model.TransactionsResult;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BlockchainService {
    private TransactionService transactionService ;
    private BlockService blockService ;
    private GenerateKeyPair generateKeyPair;


    public Blockchain blockchainInit(int difficulty,int blockSize, double initialBalance){
        Blockchain blockchain = new Blockchain(difficulty   , blockSize, initialBalance);
        blockchain.getBlockchain().add(blockService.createBlock(0, "Genesis Block", "0"));
        return blockchain;
    }

    public boolean addTransaction(Blockchain blockchain, Transaction transaction) throws SignatureException {
        //Validate transaction before adding it to the trasaction pool !!
        //String message = transaction.getMessage();
        
        String amount =((int) transaction.getAmount()==transaction.getAmount())?((int) transaction.getAmount())+"":transaction.getAmount()+"";
        

        String message = transaction.getSender()+ transaction.getReceiver() + amount;

        System.out.println("__________________");
        System.out.println("Message:");
        System.out.println(message);
        System.out.println("__________________");



        if (transaction.getSender().equals("system") ||
            (generateKeyPair.verifySignature(transaction.getSender(), message, transaction.getSignature()) &&
            verifyBalance(blockchain, transaction.getSender(),transaction.getAmount()))) 
        {
            transactionService.addTransactionToPool(transaction, blockchain);
            // Check if the transaction pool size has reached the specified block size
            if (blockchain.getTransactionsPool().size() >= blockchain.getBlockSize()) {
                // Mine a new block when the block size is reached
                addBlockToBlockchain(blockchain, "MinerAddress");
            }
            return true;
        }

        return false;
    }

    public void addBlockToBlockchain(Blockchain blockchain,String minerAddress) {
        Block newBlock = blockService.createBlock(blockchain.getBlockchain().size(), "Block Data", blockchain.getBlockchain().get(blockchain.getBlockchain().size() - 1).getHash());
        blockService.addTransactionToBLock(newBlock, blockchain.getTransactionsPool());
        transactionService.clearTransactionsPool(blockchain);
        Transaction rewardTransaction = new Transaction("system", minerAddress, 10.0, "");
        blockService.addTransactionToBLock(newBlock, new ArrayList<>(Arrays.asList(rewardTransaction)));

        blockService.mineBlock(blockchain.getDifficulty(), newBlock);
        //waiting for the verification of other nodes !!!!

        blockchain.getBlockchain().add(newBlock); 
    }

    public double getBalance(Blockchain blockchain, String publicKey) {
        double balance = blockchain.getBlockchain().stream()
            .flatMap(block -> block.getTransactions().stream())
            .filter(transaction -> transaction.getSender().equals(publicKey) || transaction.getReceiver().equals(publicKey))
            .mapToDouble(transaction -> {
                if (transaction.getReceiver().equals(publicKey)) {
                    return transaction.getAmount();
                } else {
                    return -transaction.getAmount();
                }
            })
            .sum();
        return balance;    
    }

    public boolean verifyBalance(Blockchain blockchain, String publicKey, double amount) {
        double balanceInBlockChain = getBalance(blockchain, publicKey);
        double balanceInTxPool = blockchain.getTransactionsPool().stream()
            .filter(transaction -> transaction.getSender().equals(publicKey) || transaction.getReceiver().equals(publicKey))
            .mapToDouble(transaction -> {
                if (transaction.getReceiver().equals(publicKey)) {
                    return transaction.getAmount();
                } else {
                    return -transaction.getAmount();
                }
            })
            .sum();

        return amount <= balanceInBlockChain + balanceInTxPool;
    }
    
    public TransactionsResult getTransactions(Blockchain blockchain, int page) {
        int pageSize = 8; 

        List<Transaction> allTransactions = blockchain.getBlockchain().stream()
                .flatMap(block -> block.getTransactions().stream())
                .collect(Collectors.toList()); // Collect all transactions into a list

        int totalCount = allTransactions.size(); // Get the total count of transactions

        List<Transaction> paginatedTransactions = allTransactions.stream()
                .skip((page - 1) * pageSize) // Skip elements on previous pages
                .limit(pageSize) // Limit the number of elements on the current page
                .collect(Collectors.toList()); // Collect paginated transactions into a list

        return new TransactionsResult(paginatedTransactions, totalCount);
    }

    

}
