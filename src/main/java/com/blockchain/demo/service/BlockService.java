package com.blockchain.demo.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.stereotype.Service;
import com.blockchain.demo.model.Block;
import com.blockchain.demo.model.Transaction;


@Service
public class BlockService{

    public void addTransactionToBLock(Block block ,List<Transaction> transactions){
        
        block.getTransactions().addAll(transactions);
    }

    public Block createBlock(int index, String data, String previousHash){
        Block block = new Block(index,data,previousHash);
        block.setHash(calculateHash(block));
        return block ;
    }

    public String calculateHash(Block block) {
        String dataToHash = block.getIndex() + block.getTimestamp() + block.getData() + block.getPreviousHash()+ block.getNonce();
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(dataToHash.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte hashByte : hashBytes) {
                String hex = Integer.toHexString(0xff & hashByte);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public void mineBlock(int difficulty, Block block) {
        String target = new String(new char[difficulty]).replace('\0', '0');
        while (!block.getHash().substring(0, difficulty).equals(target)) {
            block.setNonce(block.getNonce()+1);
            block.setHash(calculateHash(block));
        }
        //System.out.println("Block mined: " + hash);
    }
}
