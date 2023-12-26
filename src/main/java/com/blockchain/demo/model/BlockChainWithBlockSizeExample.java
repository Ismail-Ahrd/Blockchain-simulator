package com.blockchain.demo.model;
public class BlockChainWithBlockSizeExample {
    /* 
    public static void main(String[] args) {
        // Create a blockchain with difficulty level 4 and block size of 2 transactions
        Blockchain myBlockchain = new Blockchain(4, 2);

        // Create a few transactions
        Transaction transaction1 = new Transaction("Alice", "Bob", 5.0);
        Transaction transaction2 = new Transaction("Bob", "Charlie", 2.0);
        Transaction transaction3 = new Transaction("Charlie", "David", 3.0);

        // Add transactions to the transaction pool
        myBlockchain.addTransaction(transaction1);
        myBlockchain.addTransaction(transaction2);
        myBlockchain.addTransaction(transaction3);

        // Mine any pending blocks
        myBlockchain.mineBlock("MinerAddress");

        // Print the blockchain
        for (Block block : myBlockchain.getBlockchain()) {
            System.out.println("Index: " + block.getIndex());
            System.out.println("Timestamp: " + block.getTimestamp());
            System.out.println("Data: " + block.getData());
            System.out.println("Previous Hash: " + block.getPreviousHash());
            System.out.println("Hash: " + block.getHash());

            // Print transactions in the block
            System.out.println("Transactions:");
            for (Transaction transaction : block.getTransactions()) {
                System.out.println("  Sender: " + transaction.getSender());
                System.out.println("  Recipient: " + transaction.getRecipient());
                System.out.println("  Amount: " + transaction.getAmount());
            }

            System.out.println();
        }

        // Check if the blockchain is valid, including transaction validation
        System.out.println("Is blockchain valid? " + myBlockchain.isValid());
    }
    */
}
